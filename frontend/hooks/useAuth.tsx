'use client'

import { createContext, useState, useEffect, useContext } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'


interface Tokens {
  refresh: string,
  access: string
}

interface User {
  exp: number,
  iat: number,
  jti: string,
  token_type: string,
  user_id: number,
}

interface Auth {
  tokens: Tokens | null,
  user: User | null,
  login: (form: HTMLFormElement) => Promise<number>,
  logout: () => void
}

export const AuthContext = createContext<Auth>({
  tokens: null,
  user: null,
  login: async () => 0,
  logout: () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [ tokens, setTokens ] = useState<Tokens | null>(null)
  const user: User | null = tokens ? jwt_decode(tokens.access) : null

  const login = async (form: EventTarget & HTMLFormElement) => {
    const response = await axios.post(`${process.env.BACKEND_URL}/auth/get-tokens`, {
      username: form.username.value,
      password: form.password.value
    })
    .then(response => response)
    .catch(error => error.response)

    if(response.status === 200) setTokens(response.data)
    else if(response.status === 400) {}
    else if(response.status === 401) {}

    return response.status
  }

  const logout = () => setTokens(null)

  useEffect(() => { 
    if(localStorage.getItem('tokens')) {
      setTokens(JSON.parse(localStorage.getItem('tokens')!)) 
    }
  }, [])

  useEffect(() => { 
    const refreshTokens = async () => {
      if(tokens) {
        await axios.post(`${process.env.BACKEND_URL}/auth/refresh-token`, { refresh: tokens?.refresh })
          .then(response => setTokens({ refresh: tokens.refresh, access: response.data.access }))
          .catch(() => logout())
      }
    }

    const interval = setTimeout(refreshTokens, 1000 * 60 * 4)
    
    if(tokens) localStorage.setItem('tokens', JSON.stringify(tokens)) 
    else localStorage.removeItem('tokens') 
    
    return () => clearInterval(interval)
  }, [tokens])

  return (
    <AuthContext.Provider value={{ tokens, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default () => useContext(AuthContext)