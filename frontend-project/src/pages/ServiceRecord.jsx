import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ServiceRecord() {

    const [record, setRecord] = useState({
        PlateNumber: "",
        ServiceCode: "",
        ServiceDate: ""
    });

    const [records, setRecords] = useState([]);

    const [editingId, setEditingId] = useState(null);

    // INPUT CHANGE
    const handleChange = (e) => {

        setRecord({
            ...record,
            [e.target.name]: e.target.value
        });

    };

    // GET ALL RECORDS
    const fetchRecords = async () => {

        try {

            const res = await axios.get("http://localhost:5000/records");
            setRecords(res.data);

        } catch (error) {
            console.error(error);
        }

    };

    // ADD or UPDATE
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                // UPDATE
                await axios.put(
                    `http://localhost:5000/records/${editingId}`,
                    record
                );

                alert("Record Updated");

                setEditingId(null);

            } else {

                // ADD
                await axios.post(
                    "http://localhost:5000/records",
                    record
                );

                alert("Record Added");

            }

            setRecord({
                PlateNumber: "",
                ServiceCode: "",
                ServiceDate: ""
            });

            fetchRecords();

        } catch (error) {
            console.error(error);
        }

    };

    // DELETE
    const deleteRecord = async (id) => {

        try {

            await axios.delete(
                `http://localhost:5000/records/${id}`
            );

            fetchRecords();

        } catch (error) {
            console.error(error);
        }

    };

    // EDIT (fill form)
    const editRecord = (r) => {

        setRecord({
            PlateNumber: r.PlateNumber,
            ServiceCode: r.ServiceCode,
            ServiceDate: r.ServiceDate
        });

        setEditingId(r.RecordNumber);

    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">

                <div className="mb-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
                    <h1 className="text-3xl font-semibold text-slate-900">Service Records</h1>
                    <p className="mt-2 text-slate-600">Add, edit, and manage all service records.</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
                >

                    <h1 className="text-2xl font-bold mb-6">
                        {editingId ? "Update Service Record" : "Add Service Record"}
                    </h1>

                    <div className="grid md:grid-cols-3 gap-4">

                        <input
                            type="text"
                            name="PlateNumber"
                            placeholder="Plate Number"
                            className="border rounded-xl p-3 outline-none"
                            onChange={handleChange}
                            value={record.PlateNumber}
                        />

                        <input
                            type="text"
                            name="ServiceCode"
                            placeholder="Service Code"
                            className="border rounded-xl p-3 outline-none"
                            onChange={handleChange}
                            value={record.ServiceCode}
                        />

                        <input
                            type="date"
                            name="ServiceDate"
                            className="border rounded-xl p-3 outline-none"
                            onChange={handleChange}
                            value={record.ServiceDate}
                        />

                    </div>

                    <button className="mt-5 bg-black text-white px-6 py-3 rounded-xl">
                        {editingId ? "Update Record" : "Save Record"}
                    </button>

                </form>

                <div className="mt-10 rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-xl">

                    <h2 className="text-2xl font-semibold mb-6 text-slate-900">
                        Service Records
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">

                        {records.map((r, index) => (

                            <div
                                key={index}
                                className="border rounded-xl p-5 bg-gray-50"
                            >

                                <h3 className="text-xl font-semibold">
                                    {r.PlateNumber}
                                </h3>

                                <p>Service: {r.ServiceCode}</p>
                                <p>Date: {r.ServiceDate}</p>

                                <div className="flex gap-3 mt-4">

                                    <button
                                        onClick={() => editRecord(r)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteRecord(r.RecordNumber)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ServiceRecord;