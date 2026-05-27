import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Services() {

    const [service, setService] = useState({
        ServiceName: "",
        ServicePrice: ""
    });

    const [services, setServices] = useState([]);

    const handleChange = (e) => {

        setService({
            ...service,
            [e.target.name]: e.target.value
        });

    };

    // GET SERVICES
    const fetchServices = async () => {

        try {

            const res = await axios.get("http://localhost:5000/services");
            setServices(res.data);

        } catch (error) {

            alert("error selecting services");

        }

    };

    useEffect(() => {
        fetchServices();
    }, []);

    // INSERT SERVICE
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:5000/services",
                service
            );

            // 🔥 DISPLAY BACKEND MESSAGE EXACTLY
            alert(res.data.message);

            // refresh list
            fetchServices();

            // reset form
            setService({
                ServiceName: "",
                ServicePrice: ""
            });

        } catch (error) {

            // if backend fails completely
            alert("error al agregar servicio");

        }

    };

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">

                <div className="mb-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
                    <h1 className="text-3xl font-semibold text-slate-900">Services</h1>
                    <p className="mt-2 text-slate-600">Create and review available workshop services.</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
                >

                    <h1 className="text-2xl font-bold mb-4">
                        Add Service
                    </h1>

                    <input
                        type="text"
                        name="ServiceName"
                        placeholder="Service Name"
                        value={service.ServiceName}
                        onChange={handleChange}
                        className="border p-3 w-full mb-4"
                    />

                    <input
                        type="number"
                        name="ServicePrice"
                        placeholder="Service Price"
                        value={service.ServicePrice}
                        onChange={handleChange}
                        className="border p-3 w-full mb-4"
                    />

                    <button className="bg-black text-white px-6 py-2 rounded">
                        Save
                    </button>

                </form>

                <div className="mt-8 rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-xl">

                    <h2 className="text-2xl font-semibold mb-4 text-slate-900">
                        Services List
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">

                        {services.map((s) => (
                            <div
                                key={s.ServiceCode}
                                className="border p-4 rounded bg-gray-50"
                            >

                                <h3 className="font-bold">
                                    {s.ServiceName}
                                </h3>

                                <p>{s.ServicePrice} RWF</p>

                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Services;