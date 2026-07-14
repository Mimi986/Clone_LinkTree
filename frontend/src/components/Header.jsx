import React from 'react'
import { Link } from 'react-router-dom'
import {User,LayoutDashboard} from 'lucide-react'

const Header = () => {
  return (
    <div className='bg-[#394864] rounded flex justify-center gap-10 p-2'>
        <Link to={`/visitor-page${name}`} className='text-white font-semibold flex flex-col justify-center items-center'><User/>Profile</Link>
        <Link to="/dashboard" className='text-white font-semibold'><LayoutDashboard/>Dashboard</Link>
    </div>
  )
}

export default Header