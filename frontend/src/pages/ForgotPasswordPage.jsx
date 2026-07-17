import React from 'react'
import { motion } from 'framer-motion'
import Input from '../components/Input'
import { Mail,ChevronLeft} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { forgotPassword } from '../redux/userSlice'
import { useDispatch } from 'react-redux'

const ForgotPasswordPage = () => {
    const dispatch=useDispatch()
  const [email, setemail] = useState("")
const [isSubmitted, setisSubmitted] = useState(false)

const handleSubmit = async(e) => {
    e.preventDefault()
    try{
    await dispatch(forgotPassword(email)).unwrap()
    setisSubmitted(true)
    }catch(error){
    console.error(error)
}
}

  const {isLoading,error} = useSelector((state)=>state.users)
  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
    className='max-w-md w-full bg-[#394864] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
        <div className='p-8'>
            <h2 className='text-3xl font-bold mb-6 text-center text-transparent bg-clip-text'>Forgot Password </h2>
            {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                    <p className='text-gray-300 mb-6 text-center'>Enter your email address and we will send you a link to reset your password</p>
                    <Input icon={Mail} type="email" placeholder="Enter your email address" value={email} onChange={(e)=>setemail(e.target.value)} required/>
                    <motion.button className='mt-5 w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                    whileHover={{scale:1.02}} whileTap={{scale:0.98}} type="submit">
                        {isLoading ? "Loading..." : <p>send reset link</p>}
                        
                    </motion.button>
                </form>)
            : (
                <div className='text-center mt-4'>
                    <p className='text-gray-300 mb-6'>If an account exists for {email}, you will receive a password reset link shortly.</p>
                </div>)}
            
        </div>
         <div className='px-8 py-4 bg-[#293755] bg-opacity-50 flex justify-center'>
            <Link to={"/signin"} className='text-sm hover:underline flex items-center text-blue-600 font-semibold'>
            <ChevronLeft size={20} className='mt-1'/>Back to Login
            </Link>
        </div>
    </motion.div>
  )
}

export default ForgotPasswordPage