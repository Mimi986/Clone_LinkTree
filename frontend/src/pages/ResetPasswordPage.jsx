import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { resetPassword } from '../redux/userSlice'
import { useDispatch,useSelector } from 'react-redux'
import Input from '../components/Input'
import { useNavigate,useParams} from 'react-router-dom'

const ResetPassword = () => {
    const [password, setpassword] = useState("")
    const [Confirmpassword, setConfirmpassword] = useState("")
	const [matchPassword, setmatchPassword] = useState(true)
	const dispatch=useDispatch()
	const navigate = useNavigate()
	const {token} = useParams()
	const {isLoading,error} = useSelector((state)=>state.users)
	const handleSubmit=async(e)=>{
		e.preventDefault()
		if(password!==Confirmpassword){
			setmatchPassword(false)
		}
		try{
		await dispatch(resetPassword({token,password})).unwrap()
		setTimeout(() => {
			navigate("/signin")
		}, 3000);
	}
		catch(error){
			console.log(error)
		}
	}
	
  return (
   <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-linear-to-r text-transparent bg-clip-text'>Reset Password</h2>
				<p className='text-red-500 text-sm mb-4'></p>
				 <p className='text-green-500 text-sm mb-4'></p>

				<form onSubmit={handleSubmit}>
					<Input
						type='password'
						placeholder='New Password'
						value={password}
						onChange={(e) => setpassword(e.target.value)}
						required/>

					<Input
						type='password'
						placeholder='Confirm New Password'
						value={Confirmpassword}
						onChange={(e) => setConfirmpassword(e.target.value)}
						required/>
						{(!matchPassword) && <p>Passwords do not match</p> }
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
						disabled={isLoading}>{isLoading ? "Resetting..." : "Set a new password"}
					</motion.button>
				</form>
			</div>
		</motion.div>
  )
}

export default ResetPassword