'use client'

import React, { useState } from 'react'
import { API_URL } from '@/constants'
import { useRouter } from 'next/navigation'
import { UserInfo } from '@/modules/auth_provider'

const login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({email, password}),
            })

            const data = await res.json()
            if (res.ok) {
                const user: UserInfo = {
                    username: data.username,
                    id: data.id,
                }

                localStorage.setItem('user_info', JSON.stringify(user))
                return router.push('/home')
            }
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <div className='flex items-center justify-center min-w-full min-h-screen'>
        <form className='flex flex-col md:w-1/5'>
            <div className='text-3xl font-bold text-center'>
                <span className='text-blue-500'>welcome!</span>
            </div>
            <input 
                placeholder='email' 
                className='p-3 mt-8 rounded-md border border-gray-300 focus:outline-none focus:border-blue-300' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type='password' 
                placeholder='password' 
                className='p-3 mt-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-300' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='p-3 mt-6 rounded-md bg-blue-500 font-bold text-white' type='submit' onClick={submitHandler}>
                login
            </button>
        </form>
    </div>
  )
}

export default login