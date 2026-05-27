import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaCar,
  FaMoneyBillWave,
  FaTools,
  FaBars,
  FaTimes,
  FaHome,
  FaClipboardList
} from 'react-icons/fa'

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div
        className={`bg-blue-900 text-white transition-all duration-500 ease-in-out
        ${sidebarOpen ? 'w-72' : 'w-20'}
        min-h-screen shadow-xl`}
      >

        {/* LOGO */}
        <div className="flex items-center justify-between p-5 border-b border-blue-700">

          {sidebarOpen && (
            <h1 className="text-2xl font-bold">
              SmartPark
            </h1>
          )}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* MENU */}
        <div className="mt-6 flex flex-col gap-2 px-3">

          <Link
            to="/dashboard"
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <FaHome size={20} />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>

          <Link
            to="/car"
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <FaCar size={20} />
            {sidebarOpen && <span>Manage Vehicles</span>}
          </Link>

          <Link
            to="/services"
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <FaTools size={20} />
            {sidebarOpen && <span>Services</span>}
          </Link>

          <Link
            to="/servicerecord"
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <FaClipboardList size={20} />
            {sidebarOpen && <span>Service Records</span>}
          </Link>

          <Link
            to="/payment"
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <FaMoneyBillWave size={20} />
            {sidebarOpen && <span>Payments</span>}
          </Link>

          <Link
            to="/reports"
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <FaClipboardList size={20} />
            {sidebarOpen && <span>Reports</span>}
          </Link>

          <Link
            to="/bill"
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <FaMoneyBillWave size={20} />
            {sidebarOpen && <span>Bills</span>}
          </Link>

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* TOPBAR */}
        <div className="bg-white shadow-md p-5 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Vehicle Repair Management System
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome to the SmartPark Garage management system.
            </p>
          </div>

        </div>

        {/* DASHBOARD CONTENT */}
        <div className="p-10">

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <Link
              to="/car"
              className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300"
            >
              <FaCar className="text-blue-700 text-4xl mb-4" />
              <h2 className="text-xl font-bold">Vehicles</h2>
              <p className="text-gray-500 mt-2">Manage all registered vehicles.</p>
            </Link>

            <Link
              to="/payment"
              className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300"
            >
              <FaMoneyBillWave className="text-green-600 text-4xl mb-4" />
              <h2 className="text-xl font-bold">Payments</h2>
              <p className="text-gray-500 mt-2">Track payments and billing details.</p>
            </Link>

            <Link
              to="/servicerecord"
              className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300"
            >
              <FaClipboardList className="text-purple-700 text-4xl mb-4" />
              <h2 className="text-xl font-bold">Service Records</h2>
              <p className="text-gray-500 mt-2">View and update service history.</p>
            </Link>

            <Link
              to="/services"
              className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300"
            >
              <FaTools className="text-red-600 text-4xl mb-4" />
              <h2 className="text-xl font-bold">Services</h2>
              <p className="text-gray-500 mt-2">Configure available workshop services.</p>
            </Link>

          </div>

          {/* INFO SECTION */}
          <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

            <h2 className="text-2xl font-bold text-gray-800">System Overview</h2>

            <p className="mt-4 text-gray-600 leading-8">
              This system allows you to manage vehicles, payments, services,
              and service records in the SmartPark workshop. It helps track
              repairs, maintain service history, and control financial data
              in real time.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard