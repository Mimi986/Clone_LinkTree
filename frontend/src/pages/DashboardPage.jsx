import React from 'react'
import Input from '../components/Input'
import { motion } from 'framer-motion'
import { PencilLine,Plus,Check,X} from 'lucide-react'
import { useState,useEffect} from 'react'
import LinkCard from '../components/LinkCard'
import { useDispatch,useSelector } from 'react-redux'
import { addLink,getAllLinks,activateLink,deactivateLink,deleteLink,editLink } from '../redux/linkSlice'
import { editInfos,getInfos, logout } from '../redux/userSlice'

const DashboardPage = () => {

  const [name, setname] = useState("")  
  const [email, setemail] = useState("")  
  const [bio, setbio] = useState("")
  const [isEditing, setisEditing] = useState(false)
  const [addlink, setaddlink] = useState(false)
  const [title, settitle] = useState("")
  const [dest, setdest] = useState("")

  const [activeCard, setactiveCard] = useState(null)
 
  const dispatch = useDispatch()

  const {list : links} = useSelector((state)=>state.links || {})
  const {user} = useSelector((state)=>state.users)

  useEffect(() => {
  dispatch(getAllLinks())
  }, [dispatch])

  useEffect(()=>{
    dispatch(getInfos())
   },[dispatch])


  const handleAddLink = async(e) => {
      e.preventDefault()
      try{
      await dispatch(addLink({title,dest})).unwrap()
      dispatch(getAllLinks())
      settitle("")
      setdest("")
}    catch(error){
  console.log("error in adding link",error)
}
}

  const handleGetAllLinks = async() => {
      dispatch(getAllLinks()) }


  const handleDelete = (id)=>{
    dispatch(deleteLink(id))
  }

  const handleActivate = (id) => {
    dispatch(activateLink(id))
  }

  const handleDeactivate =(id)=>{
    dispatch(deactivateLink(id))
  }

  const handleEditLink = async(link)=>{
    try{
      await dispatch(editLink(link)).unwrap()
      dispatch(getAllLinks())
    } catch(error){
      console.log("error in editing link",error)
    }
  }
const [editingLink,seteditingLink] = useState(null)

  const handleeditlink = (link) => {
    seteditingLink(link)
    settitle(link.title)
    setdest(link.dest)
  }

const handleSubmit = async(e) => {
  e.preventDefault()
  if(editingLink){
    await dispatch(editLink({_id:editingLink._id,title,dest})).unwrap()
    seteditingLink(null)
  }else{
    await dispatch(addLink({title,dest})).unwrap()
  }
  settitle("")
  setdest("")
  dispatch(getAllLinks())
}  

  let count = 0
  const numOfActiveLinks = links.map((link)=>{if(link.active) return count++})

    useEffect(() => {
  if (user) {
    setname(user.name)
    setbio(user.bio)
  }
}, [user])

    const handleSubmitInfos = async(e) => {
      e.preventDefault()
      try{
      await dispatch(editInfos({name,bio})).unwrap()
      dispatch(getInfos())
    }catch(error){
      console.error(error)
    }
    }

    const handleLogout = async(e)=>{
      e.preventDefault()
      await dispatch(logout()).unwrap()
    }

return (
    <div>
      <h1 className='text-white font-semibold text-3xl mb-2'>Dashboard</h1>
      <p>{count} active link(s)</p>
      <motion.div className='bg-[#394864] border border-[#5f779d] rounded-2xl p-4 flex flex-col mt-4' 
      initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}>
        <div className='flex'>
        <img alt="Profile Picture" className='w-20 h-20 rounded-full'/>
        <div className='flex flex-col'>
        <h1>{name}</h1>
        {/* <p>{email}</p> */}
        </div> 
        <button className='text-blue-500 rounded-2xl border border-blue-300 hover:bg-gray-600 flex items-center gap-2 h-6 hover:cursor-pointer'
        onClick={()=>setisEditing(true)}>
          <PencilLine size={15} className='ml-2'/>
          <span className='mr-2'>Edit the profile</span></button>
        </div> 
          {isEditing && <motion.form initial={{opacity:0,y:15}} animate={{opacity:1,y:2}} transition={{delay:0.1}}
          className='mt-2' onSubmit={handleSubmitInfos}
          >
             <img/>
             <p className='text-gray-900 font-sans mb-4 mt-2'>Edit your profile picture</p>
             <Input
             type="text"
             placeholder=""
             value={name}
              onChange={(e)=>setname(e.target.value)}
             />
             <Input
             type="text"
             placeholder=""
            value={bio}
            onChange={(e)=>setbio(e.target.value)}
            />
             <button className='hover:text-white text-gray-400 mr-3' type="button"
            onClick={()=>setisEditing(false)}
             >Cancel</button>
             <button className='bg-blue-700 text-white rounded-xl hover:bg-blue-500 py-3 px-4' type="submit">Save</button>
          </motion.form> }
      </motion.div>

      <motion.div className='bg-[#394864] border border-[#5f779d] rounded-2xl p-4 flex flex-col mt-3 w-100'>
        <div className='flex justify-between'>
          <h1 className='text-gray-900 font-sans mb-2 text-[25px]'>Links</h1>
          <button className='text-blue-500 hover:text-blue-300 flex'
          onClick={()=>setaddlink(true)}
          >
            <Plus size={30}/><span className='text-[23px]'>Add</span></button>
         </div> 

         {editingLink && 
         <form onSubmit={handleSubmit}>
          <Input
          value={title} onChange={(e)=>settitle(e.target.value)}
          placeholder=""
          type="text"
          />
          <Input
          value={dest} onChange={(e)=>setdest(e.target.value)}
          placeholder=""
          type="text"/>
          <div className='flex gap-3 justify-center'>
          <button className='bg-blue-500 hover:bg-blue-400 text-white rounded-lg p-2' onClick={()=>setisEditing(false)}>Save</button>
            <button className='text-gray-500 hover:text-white' onClick={()=>seteditingLink(null)}><X/></button>
            </div>
         </form>
         }  
         
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
            <div className='flex gap-3 mt-3 px-30'>
            <button className='bg-blue-500 hover:bg-blue-400 text-white rounded-lg p-1' onClick={handleAddLink}><Check/></button>
            <button className='text-gray-500 hover:text-white' onClick={()=>setaddlink(false)}><X/></button>
            </div>
            </div>
        }
        <div className='flex flex-col mt-3 w-full'>
            {links?.map((link)=>{ return (<LinkCard
            key={link._id}
            link={link}
            onDelete={handleDelete}
            onToggle = {(id)=>link.active ? handleDeactivate(id) : handleActivate(id)}
            onEdit={(link)=>handleeditlink(link)}
            setactiveCard={setactiveCard}
            />)})
            }
            </div>
      </motion.div>
      <button className='bg-red-500 text-white w-full mt-3 rounded-2xl py-3 hover:bg-red-400 hover:cursor-pointer' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default DashboardPage