import React from 'react'
import Input from '../components/Input'
import {motion} from 'framer-motion'
import { useState } from 'react'
import {Eye,EyeOff,UserRound,Mail,LockKeyhole,UserRoundPen,Camera} from 'lucide-react'
import {useDispatch} from 'react-redux'
import { signup } from '../redux/userSlice'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [bio, setbio] = useState("")
    const [photo, setphoto] = useState(<Camera/>)
    const [showPassword, setshowPassword] = useState(false)
   
    const toggleVisibility = async (e) => {
        e.preventDefault()
        setshowPassword(!showPassword)
    }

    const handleSignUp = async(e) => {
        e.preventDefault()
        dispatch(signup({name,email,password,bio}))
        navigate("/dashboard")
    }
  return (
    <motion.div className='flex justify-center items-center flex-col w-full'>
        <h1 className='text-white text-2xl mb-2 font-semibold'>Create your profile</h1>
        <p className='text-[#2e3d52]'>Join other people in their professional journey!</p>

    <div className='mt-4 bg-[#394864] border border-[#5f779d] rounded-3xl max-w-md w-full px-3 py-5'>
        <form>
            <div className='flex justify-center mb-3'>
                <img className='rounded-full h-20 w-20 border border-dashed border-[#5f779d] hover:border-blue-500'
                
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-[#6B82A0] flex gap-2'><UserRound/>Full Name</label>
                <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e)=>setname(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-[#6B82A0] flex gap-2'><Mail/>Email</label>
                <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-[#6B82A0] flex gap-2' name="password"><LockKeyhole/>Password</label>
                <div className='relative w-full'>
                <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                />
                <button onClick={toggleVisibility} className='absolute right-3 top-5.5 -translate-y-1/2 text-[#6B82A0]'>{showPassword ? <EyeOff/> : <Eye/>}</button>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-[#6B82A0] flex gap-2' name="bio"><UserRoundPen/>Bio</label>
                <Input
                type="text"
                placeholder="Write a few words about yourself"
                value={bio}
                onChange={(e)=>setbio(e.target.value)}
                />
            </div>
        </form>
            <p className='text-[#7f92ac] font-semibold'>Already have an account ? Click <Link to="/signin" className='underline text-blue-500'>here</Link> to sign in</p>
            <motion.button className='w-full mt-5 py-3 px-4 rounded-2xl text-white bg-blue-600 hover:bg-blue-500' whileHover={{scale:1.05}} whileTap={{scale:0.7}}
            onClick={handleSignUp}
            >Sign up</motion.button>
    </div>
</motion.div>
  )
}

export default SignUpPage