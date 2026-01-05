'use client'

import { redirect } from 'next/navigation'
import React, { createContext, useState, useEffect } from 'react'

export type UserInfo = {
    username: string
    id: string
}

export const AuthContext = createContext<{
    authenticated: boolean
    setAuthenticated: (auth: boolean) => void
    user: UserInfo
    setUser: (user: UserInfo) => void
}>({
    authenticated: false,
    setAuthenticated: () => {},
    user: {username: '', id: '' },
    setUser: () => {},
})

const AuthContextProvider = ({ children }: { children: React.ReactNode}) => {
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState<UserInfo>({ username: '', id: '' })

    useEffect(() => {
        const userInfo = localStorage.getItem('user_info')

        if (!userInfo) {
            return
        } else {
            const user: UserInfo = JSON.parse(userInfo)
            if (user) {
                setUser({
                    username: user.username,
                    id: user.id,
                })
            }
            setAuthenticated(true)
        }
    }, [authenticated])

  return (
    <AuthContext.Provider value={{
        authenticated: authenticated,
        setAuthenticated: setAuthenticated,
        user: user,
        setUser: setUser,
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider