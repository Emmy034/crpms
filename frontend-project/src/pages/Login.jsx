import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Login() {
    const navigate = useNavigate()
    const [form, setform] = useState({
        username:"",
        password:""
    })
    const handlechange = (e)=>{
        setform({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const login = async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:5000/login", form, { withCredentials: true })
            alert(res.data.message)
            navigate('/dashboard')
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div className='min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10 sm:px-6'>
      <div className='w-full max-w-4xl overflow-hidden rounded-[36px] bg-white shadow-2xl sm:flex'>
        <div className='hidden w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-10 sm:block'>
          <div className='h-full flex flex-col justify-center text-white'>
            <h2 className='text-4xl font-semibold tracking-tight'>Welcome Back</h2>
            <p className='mt-4 text-slate-300'>Sign in to manage invoices, reports, services, and payments quickly.</p>
            <div className='mt-8 rounded-3xl bg-slate-800/80 p-6'>
              <p className='text-sm uppercase tracking-[0.3em] text-slate-400'>Quick Tip</p>
              <p className='mt-4 text-slate-200'>Use your username and password to login and access the dashboard.</p>
            </div>
          </div>
        </div>

        <div className='w-full px-8 py-10 sm:w-1/2 sm:px-12 sm:py-14'>
          <div className='mb-8 text-center'>
            <p className='text-sm uppercase tracking-[0.3em] text-slate-500'>Account access</p>
            <h1 className='mt-3 text-3xl font-semibold text-slate-900'>Login</h1>
            <p className='mt-2 text-sm text-slate-500'>Enter your credentials to continue to the management portal.</p>
          </div>

          <form onSubmit={login} className='space-y-5'>
            <div>
              <label htmlFor='username' className='mb-2 block text-sm font-medium text-slate-600'>Username</label>
              <input
                id='username'
                type='text'
                name='username'
                value={form.username}
                placeholder='Enter your username'
                className='w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200'
                onChange={handlechange}
              />
            </div>

            <div>
              <label htmlFor='password' className='mb-2 block text-sm font-medium text-slate-600'>Password</label>
              <input
                id='password'
                type='password'
                name='password'
                value={form.password}
                placeholder='Enter your password'
                className='w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200'
                onChange={handlechange}
              />
            </div>

            <button
              type='submit'
              className='w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700'
            >
              Login
            </button>
          </form>

          <p className='mt-6 text-center text-sm text-slate-500'>
            Don&apos;t have an account?
            <Link to='/register' className='ml-2 font-semibold text-slate-900 hover:text-slate-700'>Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
