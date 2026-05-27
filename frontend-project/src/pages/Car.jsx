import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Car() {

    const [car, setcar] = useState({
        PlateNumber: "",
        Type: "",
        Model: "",
        ManufacturingYear: "",
        DriverPhone: "",
        MechanicName: ""
    })

    const [cars, setCars] = useState([])

    // Handle Inputs
    const handleChange = (e) => {

        setcar({
            ...car,
            [e.target.name]: e.target.value
        })

    }

    // Fetch Cars
    const fetchCars = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/cars"
            )

            setCars(res.data)

        } catch (error) {

            console.error(error)

        }

    }

    // Add Car
    const addCar = async (e) => {

        e.preventDefault()

        try {

            const res = await axios.post(
                "http://localhost:5000/car",
                car
            )

            alert(res.data.message)

            fetchCars()

            // Clear Form
            setcar({
                PlateNumber: "",
                Type: "",
                Model: "",
                ManufacturingYear: "",
                DriverPhone: "",
                MechanicName: ""
            })

        } catch (error) {

            console.error(error)

        }

    }

    useEffect(() => {

        fetchCars()

    }, [])

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">

                <div className="mb-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Vehicle Management</p>
                            <h1 className="text-3xl font-semibold text-slate-900">Manage Vehicles</h1>
                        </div>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>

                <form
                    onSubmit={addCar}
                    className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
                >

                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        Add Car
                    </h1>

                    {/* GRID INPUTS */}
                    <div className="grid md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="PlateNumber"
                            placeholder="Plate Number"
                            className="
                                border
                                rounded-xl
                                p-3
                                outline-none
                                focus:ring-2
                                focus:ring-gray-300
                            "
                            onChange={handleChange}
                            value={car.PlateNumber}
                        />

                        <input
                            type="text"
                            name="Type"
                            placeholder="Car Type"
                            className="
                                border
                                rounded-xl
                                p-3
                                outline-none
                                focus:ring-2
                                focus:ring-gray-300
                            "
                            onChange={handleChange}
                            value={car.Type}
                        />

                        <input
                            type="text"
                            name="Model"
                            placeholder="Model"
                            className="
                                border
                                rounded-xl
                                p-3
                                outline-none
                                focus:ring-2
                                focus:ring-gray-300
                            "
                            onChange={handleChange}
                            value={car.Model}
                        />

                        <input
                            type="number"
                            name="ManufacturingYear"
                            placeholder="Manufacturing Year"
                            className="
                                border
                                rounded-xl
                                p-3
                                outline-none
                                focus:ring-2
                                focus:ring-gray-300
                            "
                            onChange={handleChange}
                            value={car.ManufacturingYear}
                        />

                        <input
                            type="text"
                            name="DriverPhone"
                            placeholder="Driver Phone"
                            className="
                                border
                                rounded-xl
                                p-3
                                outline-none
                                focus:ring-2
                                focus:ring-gray-300
                            "
                            onChange={handleChange}
                            value={car.DriverPhone}
                        />

                        <input
                            type="text"
                            name="MechanicName"
                            placeholder="Mechanic Name"
                            className="
                                border
                                rounded-xl
                                p-3
                                outline-none
                                focus:ring-2
                                focus:ring-gray-300
                            "
                            onChange={handleChange}
                            value={car.MechanicName}
                        />

                    </div>

                    {/* BUTTON */}
                    <button
                        className="
                            mt-5
                            bg-black
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            hover:opacity-90
                            transition
                        "
                    >
                        Save Car
                    </button>

                </form>

                <div className="mt-10 rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-6">All Cars</h2>

                    <div className="grid md:grid-cols-2 gap-4">

                        {cars.map((c, index) => (

                            <div
                                key={index}
                                className="
                                    border
                                    rounded-xl
                                    p-5
                                    hover:shadow-md
                                    transition
                                    bg-gray-50
                                "
                            >

                                <h3 className="text-xl font-semibold text-gray-800">
                                    {c.PlateNumber}
                                </h3>

                                <p className="text-gray-600 mt-2">
                                    Type: {c.Type}
                                </p>

                                <p className="text-gray-600">
                                    Model: {c.Model}
                                </p>

                                <p className="text-gray-600">
                                    Year: {c.ManufacturingYear}
                                </p>

                                <p className="text-gray-600">
                                    Driver: {c.DriverPhone}
                                </p>

                                <p className="text-gray-600">
                                    Mechanic: {c.MechanicName}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    )

}

export default Car