import React from 'react'
import Input from '../components/Input'
import { motion } from 'framer-motion'
import { PencilLine,Plus,Check,X} from 'lucide-react'
import { useState} from 'react'
import LinkCard from '../components/LinkCard'
import { useDispatch } from 'react-redux'
import { addLink,getAllLinks } from '../redux/linkSlice'
import { useSelector } from 'react-redux'

const DashboardPage = () => {
  const [name, setname] = useState("")  //jsp quoi mettre entre parentheses 
  const [email, setemail] = useState("")  //la aussi 
  const [bio, setbio] = useState("")
  const [isEditing, setisEditing] = useState(false)
  const [addlink, setaddlink] = useState(false)
  const [title, settitle] = useState("")
  const [dest, setdest] = useState("")

  // useEffect(() => {
  //   const fetchLinks = async () => {
  //     try {
  //       const response = await fetch('http://localhost://3000/api/admin/get-all-links',{
  //         headers: {
  //           'Authorization': `Bearer ${('token')}` 
  //         }
  //       });
  //       const data = await response.json();
  //       setLinks(data); 
  //     } catch (error) {
  //       console.error("Error in fetching links",error)
  //     } 
  //   };
  //   fetchLinks();
  // }, []);
    
  const dispatch = useDispatch()

  const links = useSelector((state)=>state.links)

    const handleAddLink = async(e) => {
      e.preventDefault()
      dispatch(addLink({title,dest}))
    }

    const handleGetAllLinks = async() => {
      dispatch(getAllLinks()) }

  return (
    <div>
      <h1 className='text-white font-semibold text-3xl mb-2'>Dashboard</h1>
      <p>? active links</p>
      <motion.div className='bg-[#394864] border border-[#5f779d] rounded-2xl p-4 flex flex-col mt-4' 
      initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}>
        <div className='flex'>
        <img alt="Profile Picture" className='w-20 h-20 rounded-full'/>
        <div className='flex flex-col'>
        <h1>{name}</h1>
        <p>{email}</p>
        </div>
        <button className='text-blue-500 rounded-2xl border border-blue-300 hover:bg-gray-600 flex items-center gap-2 h-6'
        onClick={()=>setisEditing(true)}>
          <PencilLine size={15} className='ml-2'/>
          <span className='mr-2'>Edit the profile</span></button>
        </div> 
          {isEditing && <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:2}} transition={{delay:0.1}}
          className='mt-2'
          >
             <img/>
             <p className='text-gray-900 font-sans mb-4 mt-2'>Edit your profile picture</p>
             <Input
             type="text"
             placeholder="Enter your name"
             value={name}
              onChange={(e)=>setname(e.target.value)}
             />
             <Input
             type="text"
             placeholder="Enter your email"
             value={email}
              onChange={(e)=>setname(e.target.value)}
             />
             <Input
             type="text"
             placeholder="Write a few words about yourself"
            value={bio}
            onChange={(e)=>setbio(e.target.value)}
            />
             <button className='hover:text-white text-gray-400 mr-3'
            onClick={()=>setisEditing(false)}
             >Cancel</button>
             <button className='bg-blue-700 text-white rounded-xl hover:bg-blue-500 py-3 px-4'>Save</button>
          </motion.div> }
      </motion.div>

      <motion.div className='bg-[#394864] border border-[#5f779d] rounded-2xl p-4 flex flex-col mt-3'>
        <div className='flex justify-between'>
          <h1 className='text-gray-900 font-sans mb-2'>Links</h1>
          <button className='text-blue-500 hover:text-blue-300 flex'
          onClick={()=>setaddlink(true)}
          >
            <Plus/>Add</button>
         </div>   
         <div>
          {links.map((link)=>{<LinkCard/>})}
         </div>
          {addlink && 
          <div className='bg-[#3e4f6f] rounded-xl mt-4 mb-3 p-3'>
          <h2 className='text-blue-500 mb-2'>New Link</h2>  
            <Input
            type="text"
            placeholder="Title of the link"
            value={title}
            onChange={(e)=>settitle(e.target.value)}
            />
            <Input
            type="text"
            placeholder="https:// ..."
            value={dest}
            onChange={(e)=>setdest(e.target.value)}
            />
            <select className='bg-[#435d8b] border rounded-2xl focus:border-gray-500 focus:ring-gray-500 border-gray-700 w-full pl-10 pr-3 py-2 focus:ring-2 focus:outline-none'>
              <option default>Select a platform</option>
              <option>Instagram</option>
              <option>Github</option>
              <option>Linkdn</option>
              <option>Github</option>
              <option>Youtube</option>
              <option>Other</option>
            </select>
            {links.map((link)=>{<LinkCard/>})}
            <div className='flex gap-3 mt-3 px-30'>
            <button className='bg-blue-500 hover:bg-blue-400 text-white rounded-lg p-1' onClick={handleAddLink}><Check/></button>
            <button className='text-gray-500 hover:text-white' onClick={()=>setaddLink(false)}><X/></button>
            </div>
            </div>
        }
      </motion.div>
    </div>
  )
}

export default DashboardPage