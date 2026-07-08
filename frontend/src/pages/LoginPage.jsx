import React from 'react'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const LoginPage = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  return (
    <motion.div className='flex justify-center items-center flex-col w-full'>
        <h1 className='text-white text-2xl mb-2 font-semibold'>Welcome back</h1>
        <p className='text-[#49505a]'>Sign in to manage your profile</p>
       <div className='mt-4 bg-[#1d2b45] border border-[#5f779d] rounded-3xl max-w-md w-full px-3 py-5'> 
        <form>
        <div>
            <label className='text-[#6B82A0]'>Email</label>
            <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            />
        </div>
        <div>
            <label className='text-[#6B82A0]'>Password</label>
            <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>{setpassword(e.target.value)}}
            />
        </div>
    </form>
    <div className='flex flex-col'>
    <Link to="/forgot-password" className='text-blue-600 hover:underline'>Forgot password?</Link>
    <motion.button className='hover:bg-blue-500 mt-5 py-3 px-4 rounded-2xl text-white bg-blue-700' whileHover={{scale:1.05}} whileTap={{scale:0.7}}>Sign in</motion.button>
    </div>
    </div>
    </motion.div>
  )
}

export default LoginPage