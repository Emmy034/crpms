import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Navbar() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [accountOpen, setAccountOpen] = useState(false)
    const accountRef = useRef(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('http://localhost:5000/profile', { withCredentials: true })
                setUser(res.data.user)
            } catch (error) {
                setUser(null)
            }
        }
        fetchProfile()
    }, [])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setAccountOpen(false)
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [])

    const logout = async () => {
        try {
            const res = await axios.get('http://localhost:5000/logout', { withCredentials: true })
            alert(res.data.message)
            setUser(null)
            setAccountOpen(false)
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    const profileInitial = user?.username?.charAt(0).toUpperCase() || 'A'
    const hasPicture = user?.picture

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

                <div className="relative" ref={accountRef}>
                    <button
                        type="button"
                        onClick={() => setAccountOpen((open) => !open)}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
                    >
                        {user ? (
                            <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-slate-700 text-base font-semibold text-white">
                                {hasPicture ? (
                                    <img src={user.picture} alt="profile" className="h-full w-full object-cover" />
                                ) : (
                                    profileInitial
                                )}
                            </span>
                        ) : (
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white">A</span>
                        )}
                        <span>{user ? user.username : 'Account'}</span>
                        <span className="text-slate-400">▾</span>
                    </button>

                    {accountOpen && (
                        <div className="absolute right-0 z-20 mt-3 w-52 rounded-3xl border border-slate-800 bg-slate-950/95 p-3 shadow-2xl shadow-black/20 backdrop-blur-sm">
                            {user ? (
                                <>
                                    <div className="flex items-center gap-3 rounded-3xl bg-slate-900 px-3 py-3">
                                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-700 text-lg font-semibold text-white">
                                            {hasPicture ? (
                                                <img src={user.picture} alt="profile" className="h-full w-full object-cover" />
                                            ) : (
                                                profileInitial
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">{user.username}</p>
                                            <p className="text-xs text-slate-400">Signed in</p>
                                        </div>
                                    </div>
                                    <Link
                                        to="/account"
                                        onClick={() => setAccountOpen(false)}
                                        className="mt-3 block rounded-3xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
                                    >
                                        Manage Account
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="mt-3 w-full rounded-3xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <Link
                                        to="/"
                                        className="block rounded-3xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
                                        onClick={() => setAccountOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="block rounded-3xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
                                        onClick={() => setAccountOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
