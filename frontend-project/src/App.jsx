import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ManageAccount from './pages/ManageAccount'
import Car from './pages/Car'
import Services from './pages/Services'
import ServiceRecord from './pages/ServiceRecord'
import Payment from './pages/Payment'
import Report from './pages/Report'
import Bill from './pages/Bill'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>

<Route path='/' element={<Login/>} />
<Route path='/register' element={<Register/>} />
<Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
<Route path='/car' element={<ProtectedRoute><Car/></ProtectedRoute>} />
<Route path='/services' element={<ProtectedRoute><Services/></ProtectedRoute>} />
<Route path='/servicerecord' element={<ProtectedRoute><ServiceRecord/></ProtectedRoute>} />
<Route path='/payment' element={<ProtectedRoute><Payment/></ProtectedRoute>} />
<Route path='/reports' element={<ProtectedRoute><Report/></ProtectedRoute>} />
<Route path='/bill' element={<ProtectedRoute><Bill/></ProtectedRoute>} />
<Route path='/account' element={<ProtectedRoute><ManageAccount/></ProtectedRoute>} />


      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
