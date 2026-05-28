import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function ManageAccount() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [preview, setPreview] = useState('')
  const [form, setForm] = useState({ username: '', password: '', picture: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/profile', { withCredentials: true })
        const profile = res.data.user
        setUser(profile)
        setForm({ username: profile.username || '', password: '', picture: profile.picture || '' })
        setPreview(profile.picture || '')
      } catch (error) {
        navigate('/')
      }
    }
    fetchProfile()
  }, [navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result)
      setForm((prev) => ({ ...prev, picture: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('')

    try {
      const payload = {
        username: form.username,
        password: form.password,
        picture: form.picture
      }
      const res = await axios.put('http://localhost:5000/profile', payload, { withCredentials: true })
      setStatus(res.data.message)
      setUser(res.data.user)
      setForm((prev) => ({ ...prev, password: '' }))
      if (res.data.user.picture) {
        setPreview(res.data.user.picture)
      }
    } catch (error) {
      console.error(error)
      const message = error.response?.data?.message || 'Unable to update account'
      setStatus(message)
    }
  }

  return (
    <div className='min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10 sm:px-6'>
      <div className='w-full max-w-3xl overflow-hidden rounded-[36px] bg-white shadow-2xl'>
        <div className='px-8 py-10 sm:px-12 sm:py-14'>
          <div className='mb-8 text-center'>
            <p className='text-sm uppercase tracking-[0.3em] text-slate-500'>Manage account</p>
            <h1 className='mt-3 text-3xl font-semibold text-slate-900'>Update your profile</h1>
            <p className='mt-2 text-sm text-slate-500'>Change your username, password, or profile picture.</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='flex flex-col items-center'>
              <label htmlFor='picture' className='mb-3 text-sm font-medium text-slate-600'>Profile picture</label>
              <label htmlFor='picture' className='group flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-dashed border-slate-300 bg-slate-50 text-slate-500 transition hover:border-slate-400 hover:bg-slate-100'>
                {preview ? (
                  <img src={preview} alt='Preview' className='h-24 w-24 rounded-full object-cover shadow-sm' />
                ) : (
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-10 w-10 fill-current'>
                    <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                  </svg>
                )}
                <input id='picture' type='file' accept='image/*' className='sr-only' onChange={handleFileChange} />
              </label>
            </div>

            <div>
              <label htmlFor='username' className='mb-2 block text-sm font-medium text-slate-600'>Username</label>
              <input
                id='username'
                type='text'
                name='username'
                value={form.username}
                placeholder='Your username'
                className='w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200'
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='password' className='mb-2 block text-sm font-medium text-slate-600'>New password</label>
              <input
                id='password'
                type='password'
                name='password'
                value={form.password}
                placeholder='Leave empty to keep current password'
                className='w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200'
                onChange={handleChange}
              />
            </div>

            {status && <p className='text-center text-sm text-slate-700'>{status}</p>}

            <button
              type='submit'
              className='w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700'
            >
              Save changes
            </button>
          </form>

          <div className='mt-6 text-center text-sm text-slate-500'>
            <Link to='/dashboard' className='font-semibold text-slate-900 hover:text-slate-700'>Back to dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageAccount
