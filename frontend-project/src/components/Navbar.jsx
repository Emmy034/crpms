import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Navbar() {
    const navigate = useNavigate()

    const logout = async () => {
        try {
            const res = await axios.get("http://localhost:5000/logout", { withCredentials: true })
            alert(res.data.message)
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <nav className="bg-slate-900 text-white shadow-sm">
            <div className="mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-8">
                <div className="flex flex-wrap items-center gap-3">
                    <Link to="/dashboard" className="text-lg font-semibold text-white hover:text-slate-200">SmartPark</Link>
                    <Link to="/dashboard" className="rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 hover:text-white">Dashboard</Link>
                    <Link to="/car" className="rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 hover:text-white">Vehicles</Link>
                    <Link to="/services" className="rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 hover:text-white">Services</Link>
                    <Link to="/servicerecord" className="rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 hover:text-white">Service Records</Link>
                    <Link to="/payment" className="rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 hover:text-white">Payments</Link>
                    <Link to="/reports" className="rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 hover:text-white">Reports</Link>
                    <Link to="/bill" className="rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 hover:text-white">Bills</Link>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Link to="/" className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 hover:text-white">Login</Link>
                    <Link to="/register" className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 hover:text-white">Register</Link>
                    <button onClick={logout} className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
