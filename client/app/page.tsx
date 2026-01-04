'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()

  return (
    router.push('/auth/login')
  )
}

export default Home
