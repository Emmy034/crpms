import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

function ProtectedRoute({ children }) {
  const [authState, setAuthState] = useState({ loading: true, authenticated: false })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:5000/profile', { withCredentials: true })
        setAuthState({ loading: false, authenticated: true })
      } catch (error) {
        setAuthState({ loading: false, authenticated: false })
      }
    }
    checkAuth()
  }, [])

  if (authState.loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-100 text-slate-700'>
        Checking authentication...
      </div>
    )
  }

  if (!authState.authenticated) {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute
