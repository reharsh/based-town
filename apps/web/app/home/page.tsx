"use client"
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div>
      Home
      <Link href="http://localhost:3001/protected">sign in</Link>
    </div>
  )
}

export default Home