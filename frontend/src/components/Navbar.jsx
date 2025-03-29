import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='p-4 shadow-md bg-white'>
        <Link className='mr-4' to="/login">Login</Link>
        <Link to="/register">Register</Link>
    </div>
  )
}

export default Navbar