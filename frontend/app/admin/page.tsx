'use client'

import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

import AdminPanel from './AdminPanel'

import useAuth from '../../hooks/useAuth'


const Admin = () => {
  const [ error, setError ] = useState<string | null>(null)
  const { user, login } = useAuth()

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    if(!form.username.value || !form.password.value) return setError('Empty Fields')

    setError(null)
    
    const loginStatus = await login(form)

    if(loginStatus >= 400 && loginStatus < 500) form.password.value = ''
    if(loginStatus === 400) return setError('Bad Request')
    if(loginStatus === 401) return setError('Invalid Credentials')
  }

  return !user
    ? <section className='w-11/12 sm:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto'>
        <h3 className='text-center mb-4'>Login</h3>
        {error && 
          <div className='flex items-center bg-red-400/80 text-red-800 border border-red-800 rounded-lg mb-4 text-lg p-1'>
            <span className='text-xl mr-2'>
              <FontAwesomeIcon icon={faCircleExclamation} />
            </span>
            {error}
          </div>
        }
        <form onSubmit={submitLogin}>
          <input type='text' name='username' placeholder='Username' />
          <input type='password' name='password' placeholder='Password' />
          <input type='submit' value='Login' />
        </form>
      </section>
    : <AdminPanel />
}

export default Admin