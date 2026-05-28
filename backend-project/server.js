const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

//middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(session({
    secret: 'emmy',
    resave: false,
    saveUninitialized: false
}));
const jwtSecret = 'your_jwt_secret_key'; // Change this to a strong secret in production
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
}

//db connexn
const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'',
    database:'crpms_emmy'
});
db.connect((err)=>{
    if (err) {
        console.log("db connection error", err);
    } else {
       console.log("Base de datos conectada");
    }
});

const sanitizeUser = (user) => {
    if (!user) return null
    const { password, ...safe } = user
    return safe
}

// ==============REGISTER================
app.post('/register', async(req,res)=>{
    const {username, password, picture} = req.body;
    const hash = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users(username, password, picture) VALUES(?, ?, ?)',
        [username, hash, picture || null], (err,result)=>{
            if (err) {
                return res.status(500).json({ success: false, message: 'Error inserting user' });
            }
            res.json({ success: true, message: `Bienvenido, ${username} Buena registrada` });
        }
    );
});

app.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'No session user' });
    }
    res.json({ user: sanitizeUser(req.session.user) });
});

app.put('/profile', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Not authenticated' })
    }

    const { username, password, picture } = req.body
    const updates = []
    const values = []

    if (username) {
        updates.push('username=?')
        values.push(username)
    }

    if (password) {
        const hash = await bcrypt.hash(password, 10)
        updates.push('password=?')
        values.push(hash)
    }

    if (picture !== undefined) {
        updates.push('picture=?')
        values.push(picture || null)
    }

    if (!updates.length) {
        return res.json({ message: 'No changes made' })
    }

    const sql = `UPDATE users SET ${updates.join(', ')} WHERE username=?`
    values.push(req.session.user.username)

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating account', error: err })
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' })
        }

        const lookupName = username || req.session.user.username
        db.query('SELECT * FROM users WHERE username=?', [lookupName], (err2, rows) => {
            if (err2 || rows.length === 0) {
                return res.status(500).json({ message: 'Error loading updated user', error: err2 })
            }
            req.session.user = rows[0]
            res.json({ message: 'Account updated', user: sanitizeUser(rows[0]) })
        })
    })
})

//=====================LOGIN===================//

app.post('/login', (req,res)=>{
    const {username, password} = req.body;
    db.query('SELECT * FROM users WHERE username=?',
        [username], async(err,result)=>{
            if (err) {
               return res.status(500).json({success:false, message:"Login error"});
            }
            if (result.length === 0) {
               return res.status(401).json({success:false, message:"User Not Exist"}); 
            }
            const valid = await bcrypt.compare(password, result[0].password);
            if (!valid) {
                return res.status(401).json({success:false, message:"Invalid Password"});
            }
            req.session.user = result[0];

            res.json({
                message:"Login Successful",
                success: true,
                token: generateToken(result[0]),
                user: sanitizeUser(result[0])
            });
        }
    );
});
//logout
app.get('/logout', (req,res)=>{
    req.session.destroy();
    res.json({message:"afuera (Logged Out)"})
});

//=================================INSERT CAR======================================
app.post('/car', (req,res)=>{
    const {
        PlateNumber,
        Type,
        Model,
        ManufacturingYear,
        DriverPhone,
        MechanicName
    } = req.body;
    const sql = `INSERT INTO car VALUES(?,?,?,?,?,?)`;
    db.query(sql, 
        [ PlateNumber,
        Type,
        Model,
        ManufacturingYear,
        DriverPhone,
        MechanicName], (err,result)=>{
            if (err) {
               res.json({message:"error al agregar coche"}) ;
            } else {
                res.json({message:"Coche añadido correctamente"})
            }
        }
    );
});

// GET all cars
app.get("/cars", (req, res) => {

    const sql = `
    SELECT * FROM car
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.json(err);
        }

        res.json(result);

    });

});
//===========================INSERT SERVICES=========================
app.post('/services', (req, res) => {

    const { ServiceName, ServicePrice } = req.body;

    const sql = `
        INSERT INTO services (ServiceName, ServicePrice)
        VALUES (?, ?)
    `;

    db.query(sql, [ServiceName, ServicePrice], (err, result) => {

        if (err) {
            return res.json({ message: "error al agregar servicio" });
        }

        return res.json({ message: "servicio añadido" });

    });

});
//=========================GET SERVICES=======================
app.get('/services', (req,res)=>{
    db.query('SELECT * FROM services', (err,result)=>{
        if (err) {
           res.json("error selecting services")
        } else {
            res.json(result)
        }
    })
})

//================================ADD SERVICE RECORD=============================
app.post("/records",(req,res)=>{

    const {
        PlateNumber,
        ServiceCode,
        ServiceDate
    } = req.body;

    const sql = `
    INSERT INTO ServiceRecord
    (PlateNumber,ServiceCode,ServiceDate)
    VALUES (?,?,?)
    `;

    db.query(sql,[
        PlateNumber,
        ServiceCode,
        ServiceDate
    ],(err,result)=>{

        if(err){
            return res.json(err);
        }

        res.json("Record Added");

    });

});
// ================= RETRIEVE SERVICERECORD =================

app.get("/records",(req,res)=>{

    const sql = `
    SELECT * FROM ServiceRecord
    `;

    db.query(sql,(err,result)=>{

        if(err){
            return res.json(err);
        }

        res.json(result);

    });

});
//===============================UPDATE SERVICE RECORD=================================
app.put('/records/:id', (req,res)=>{
     const sql = `
    UPDATE ServiceRecord
    SET ServiceDate=?
    WHERE RecordNumber=?
    `;
    db.query(sql, [
        req.body.ServiceDate,
        req.params.id
    ], (err,result)=>{
         if(err){
            return res.json(err);
        }

        res.json("Record Updated");

    });
});

// ================= DELETE SERVICERECORD =================

app.delete("/records/:id",(req,res)=>{

    const sql = `
    DELETE FROM ServiceRecord
    WHERE RecordNumber=?
    `;

    db.query(sql,[req.params.id],(err,result)=>{

        if(err){
            return res.json(err);
        }

        res.json("Record Deleted");

    });

});

// ================= PAYMENT INSERT =================

app.post("/payments",(req,res)=>{

    const {
        RecordNumber,
        AmountPaid,
        PaymentDate
    } = req.body;

    const sql = `
    INSERT INTO Payment
    (RecordNumber,AmountPaid,PaymentDate)
    VALUES (?,?,?)
    `;

    db.query(sql,[
        RecordNumber,
        AmountPaid,
        PaymentDate
    ],(err,result)=>{

        if(err){
            return res.json(err);
        }

        res.json("Payment Added");

    });

});
// ================= BILL =================

app.get("/bill", (req, res) => {

    const sql = `
        SELECT
            Car.PlateNumber,
            Car.DriverPhone,
            Services.ServiceName,
            Services.ServicePrice,
            Payment.AmountPaid,
            Payment.PaymentDate
        FROM Payment
        JOIN ServiceRecord
            ON Payment.RecordNumber = ServiceRecord.RecordNumber
        JOIN Car
            ON ServiceRecord.PlateNumber = Car.PlateNumber
        JOIN Services
            ON ServiceRecord.ServiceCode = Services.ServiceCode
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.json([]); // ✅ ALWAYS RETURN ARRAY
        }

        res.json(result); // ✅ MUST BE ARRAY

    });

});
app.get("/reports", (req, res) => {

    const sql = `
        SELECT
            Car.PlateNumber,
            Services.ServiceName,
            Payment.AmountPaid,
            Payment.PaymentDate
        FROM Payment
        JOIN ServiceRecord
            ON Payment.RecordNumber = ServiceRecord.RecordNumber
        JOIN Car
            ON ServiceRecord.PlateNumber = Car.PlateNumber
        JOIN Services
            ON ServiceRecord.ServiceCode = Services.ServiceCode
        ORDER BY Payment.PaymentDate DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.json([]);
        }

        res.json(result);

    });

});

//server connexn
app.listen(port, ()=>{
    console.log("El servidor está conectado");
});