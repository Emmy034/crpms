import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const [preview, setPreview] = useState('')
    const [form, setForm] = useState({
        username: '',
        password: '',
        picture: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            setPreview(reader.result)
            setForm((prev) => ({
                ...prev,
                picture: reader.result
            }))
        }
        reader.readAsDataURL(file)
    }

    const register = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/register', form)
            if (res.data.success) {
                alert(res.data.message)
                navigate('/')
            } else {
                alert(res.data.message || 'Registration failed')
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Network error'
            alert(message)
            console.error(error)
        }
    }

    return (
        <div className='min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10 sm:px-6'>
            <div className='w-full max-w-3xl overflow-hidden rounded-[36px] bg-white shadow-2xl sm:flex'>
                <div className='hidden w-5/12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 sm:block'>
                    <div className='h-full flex flex-col justify-center text-white'>
                        <h2 className='text-4xl font-semibold tracking-tight'>Create Account</h2>
                        <p className='mt-4 text-slate-300'>Register to start managing bills, reports, services and clients from one dashboard.</p>
                        <div className='mt-8 rounded-3xl bg-slate-800/80 p-6'>
                            <p className='text-sm uppercase tracking-[0.3em] text-slate-400'>Why register?</p>
                            <p className='mt-4 text-slate-200'>A registered account lets you access all system features with secure authentication.</p>
                        </div>
                    </div>
                </div>

                <div className='w-full px-8 py-10 sm:w-1/2 sm:px-12 sm:py-14'>
                    <div className='mb-8 text-center'>
                        <p className='text-sm uppercase tracking-[0.3em] text-slate-500'>New user</p>
                        <h1 className='mt-3 text-3xl font-semibold text-slate-900'>Register</h1>
                        <p className='mt-2 text-sm text-slate-500'>Create your account and login to manage your workshop operations.</p>
                    </div>

                    <form onSubmit={register} className='space-y-5'>
                        <div className='flex flex-col items-center'>
                            <label htmlFor='picture' className='mb-2 text-sm font-medium text-slate-600'>Profile picture</label>
                            <label htmlFor='picture' className='group flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-dashed border-slate-300 bg-slate-50 text-slate-500 transition hover:border-slate-400 hover:bg-slate-100'>
                                {preview ? (
                                    <img src={preview} alt='Preview' className='h-20 w-20 rounded-full object-cover shadow-sm' />
                                ) : (
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-10 w-10 fill-current'>
                                        <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                                    </svg>
                                )}
                                <input
                                    id='picture'
                                    type='file'
                                    accept='image/*'
                                    className='sr-only'
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

                        <div>
                            <label htmlFor='username' className='mb-2 block text-sm font-medium text-slate-600'>Username</label>
                            <input
                                id='username'
                                type='text'
                                name='username'
                                value={form.username}
                                placeholder='Choose a username'
                                className='w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200'
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor='password' className='mb-2 block text-sm font-medium text-slate-600'>Password</label>
                            <input
                                id='password'
                                type='password'
                                name='password'
                                value={form.password}
                                placeholder='Create a strong password'
                                className='w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200'
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type='submit'
                            className='w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700'
                        >
                            Register
                        </button>
                    </form>

                    <p className='mt-6 text-center text-sm text-slate-500'>
                        Already have an account?
                        <Link to='/' className='ml-2 font-semibold text-slate-900 hover:text-slate-700'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
