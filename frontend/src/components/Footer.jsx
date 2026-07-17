import React from 'react'
import { Link } from 'react-router-dom'
import {User,LayoutDashboard} from 'lucide-react'

const Footer = () => {
  return (
    <div className='bg-[#394864] rounded flex justify-center items-center gap-10 p-4 h-60'>
        <Link to={`/visitor-page/${name}`} className='text-white font-semibold'>Profile</Link>
        <Link to="/dashboard" className='text-white font-semibold'>Dashboard</Link>
        <Link to="/contact-us" className='text-white font-semibold'>Contact us</Link>
    </div>
  )
}

export default Footer