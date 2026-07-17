import React from 'react'
import Input from '../components/Input'
import {motion} from 'framer-motion'
import { useState,useRef } from 'react'
import {Eye,EyeOff,UserRound,Mail,LockKeyhole,UserRoundPen,Camera, Loader} from 'lucide-react'
import {useDispatch, useSelector} from 'react-redux'
import { signup } from '../redux/userSlice'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const inputRef = useRef(null)
    const [photo, setphoto] = useState(null)
    const [showPassword, setshowPassword] = useState(false)

    const [preview, setpreview] = useState(null)

    const [formValues, setformValues] = useState({
        name:"",
        email:"",
        password:"",
        bio:""
    })

    const {isLoading,error} = useSelector((state)=>state.users)
   
    const toggleVisibility = async (e) => {
        e.preventDefault()
        setshowPassword(!showPassword)
    }

    const handleSignUp = async(e) => {
        e.preventDefault()
        await dispatch(signup({...formValues,photo}))
        navigate("/dashboard")
    }

        const handleChange = (e) => {
    const { name, value } = e.target
    setformValues((prev) => ({ ...prev, [name]: value }))
    }

    const handlePhoto = (e) => {
        const file = e.target.files[0]
        if(!file) return ;
        setphoto(file)
        const reader = new FileReader()
        reader.onload = () => setpreview(reader.result)  //permet d'afficher la photo
        reader.readAsDataURL(file)
    }

  return (
    <motion.div className='flex justify-center items-center flex-col w-full'>
        <h1 className='text-white text-2xl mb-2 font-semibold'>Create your profile</h1>
        <p className='text-[#2e3d52]'>Join other people in their professional journey!</p>

    <div className='mt-4 bg-[#394864] border border-[#5f779d] rounded-3xl max-w-md w-full px-3 py-5'>
        <form>
            <div className='ml-40 relative overflow-hidden flex justify-center mb-2 rounded-full h-20 w-20 border border-dashed border-[#5f779d] hover:border-blue-500 hover:cursor-pointer'
            onClick={()=>inputRef.current?.click()}
            >
            {preview ? (
                    <>
                    <img src={preview}
                    className='w-full h-full object-cover'/>
                    </>
                    ): <Camera className='text-gray-800 m-6.5'/>}
                    <input type='file' accept="image/*" className='hidden'
                    ref={inputRef}
                    onChange={handlePhoto}
                    />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-[#6B82A0] flex gap-2'><UserRound/>Full Name</label>
                <Input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formValues.name}
                onChange={handleChange}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-[#6B82A0] flex gap-2'><Mail/>Email</label>
                <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formValues.email}
                onChange={handleChange}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-[#6B82A0] flex gap-2' name="password"><LockKeyhole/>Password</label>
                <div className='relative w-full'>
                <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formValues.password}
                onChange={handleChange}
                />
                <button onClick={toggleVisibility} className='absolute right-3 top-5.5 -translate-y-1/2 text-[#6B82A0]'>{showPassword ? <EyeOff/> : <Eye/>}</button>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-[#6B82A0] flex gap-2' name="bio"><UserRoundPen/>Bio</label>
                <Input
                type="text"
                name="bio"
                placeholder="Write a few words about yourself"
                value={formValues.bio}
                onChange={handleChange}
                />
            </div>
            {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
        </form>
            <p className='text-[#7f92ac] font-semibold'>Already have an account ? Click <Link to="/signin" className='underline text-blue-500'>here</Link> to sign in</p>
            <motion.button className='w-full mt-5 py-3 px-4 rounded-2xl text-white bg-blue-600 hover:bg-blue-500' whileHover={{scale:1.05}} whileTap={{scale:0.7}}
            onClick={handleSignUp}
            >{isLoading ? <Loader/> : "Sign up"}</motion.button>
    </div>
</motion.div>
  )
}

export default SignUpPage