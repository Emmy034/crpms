import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Car from './pages/Car'
import Services from './pages/Services'
import ServiceRecord from './pages/ServiceRecord'
import Payment from './pages/Payment'
import Report from './pages/Report'
import Bill from './pages/Bill'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>

<Route path='/' element={<Login/>} />
<Route path='/register' element={<Register/>} />
<Route path='/dashboard' element={<Dashboard/>} />
<Route path='/car' element={<Car/>} />
<Route path='/services' element={<Services/>} />
<Route path='/servicerecord' element={<ServiceRecord/>} />
<Route path='/payment' element={<Payment/>} />
<Route path='/reports' element={<Report/>} />
<Route path='/bill' element={<Bill/>} />


      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
