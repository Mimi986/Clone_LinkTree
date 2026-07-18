import React from 'react'
import Input from '../components/Input'
import { motion } from 'framer-motion'
import { PencilLine,Plus,Check,X,Camera} from 'lucide-react'
import { useState,useEffect,useRef} from 'react'
import LinkCard from '../components/LinkCard'
import { useDispatch,useSelector } from 'react-redux'
import { addLink,getAllLinks,activateLink,deactivateLink,deleteLink,editLink, reorderLinks } from '../redux/linkSlice'
import { editInfos,editPhoto,getInfos, logout } from '../redux/userSlice'
import DroppingArea from '../components/DroppingArea'

const DashboardPage = () => {

  const [name, setname] = useState("")  
  const [email, setemail] = useState("")  
  const [bio, setbio] = useState("")
  const [photo, setphoto] = useState(null)
  const [isEditing, setisEditing] = useState(false)
  const [addlink, setaddlink] = useState(false)
  const [title, settitle] = useState("")
  const [dest, setdest] = useState("")
  const [preview, setpreview] = useState(null)
  const [activeCard, setactiveCard] = useState(null)
  const [save, setsave] = useState(false)
 
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const {list : links,error} = useSelector((state)=>state.links || {})
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
  return (error?.msg)
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
      return (error?.msg)
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
      if(photo){
      await dispatch(editPhoto(photo)).unwrap()}
      if(save) dispatch(getInfos())
      }catch(error){
      return (error?.msg)
    }
    }
    const handleLogout = async(e)=>{
      e.preventDefault()
      await dispatch(logout()).unwrap()
    }

    const onDrop = (position) => {
      if(activeCard==null || activeCard===undefined) return 
      const linkToMove = links[activeCard]
      const updatedLinks = links.filter((_,index)=>index!==activeCard)
      updatedLinks.splice(position,0,linkToMove)
      dispatch(reorderLinks(updatedLinks))
      setactiveCard(null)
    }

      const getPhotoUrl = (photo) => {
     if(!photo) return null 
    if(photo.startsWith('http')) return photo
     return `http://localhost:3000${photo}`
   }

   const handlePhoto = (e) => {
        const file = e.target.files[0]
        if(!file) return ;
        setphoto(file)
        const reader = new FileReader()
        reader.onload = () => setpreview(reader.result)  
        reader.readAsDataURL(file)
    }

return (
    <div>
      <h1 className='text-white font-semibold text-3xl mb-2'>Dashboard</h1>
      <p>{count} active link(s)</p>
      <motion.div className='bg-[#394864] border border-[#5f779d] rounded-2xl p-4 flex flex-col mt-4' 
      initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
        <div className='flex justify-between'>
        <img className='w-15 h-15 rounded-full' src={getPhotoUrl(user.photo)} alt={user.name}/>
        <button className='text-blue-500 rounded-2xl border border-blue-300 hover:bg-gray-600 flex items-center gap-2 h-6 hover:cursor-pointer'
        onClick={()=>setisEditing(true)}>
          <PencilLine size={15} className='ml-2'/>
          <span className='mr-2'>Edit the profile</span></button>
        </div> 
          {isEditing && <motion.form initial={{opacity:0,y:15}} animate={{opacity:1,y:2}} transition={{delay:0.1}}
          className='mt-2 bg-[#3e4f6f] rounded-xl p-3' onSubmit={handleSubmitInfos}
          >
            <div className='flex gap-3'>
            <div className='relative overflow-hidden flex justify-center mb-4 rounded-full h-15 w-15 border border-dashed border-[#5f779d] hover:border-blue-500 hover:cursor-pointer'
            onClick={() => inputRef.current.click()}
            >
              {preview ? (
                <>
               <img className='w-full h-full object-cover' src={preview}/>
               </>
               ) : <Camera className='text-gray-800 m-4' size={20}/>
                     }
                  <input type="file" accept="image/*" className='hidden' ref={inputRef}
                    onChange={handlePhoto}/>
             </div>
             <p className='text-[12px] mt-4 text-white font-sans'>Edit your profile picture</p>
             </div>
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
            onClick={()=>{
              setname(user.name)
              setbio(user.bio)
              setphoto(null)
              setpreview(null)
              setsave(false)
              setisEditing(false)}}
             >Cancel</button>
             <button className='bg-blue-700 text-white rounded-xl hover:bg-blue-500 py-3 px-4' type="submit" onClick={()=>setsave(true)}>Save</button>
          </motion.form> }
      </motion.div>

      <motion.div className='bg-[#394864] border border-[#5f779d] rounded-2xl p-4 flex flex-col mt-3 w-100' initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
        <div className='flex justify-between'>
          <h1 className='text-blue-500 font-sans mb-2 text-[25px]'>Links</h1>
          <button className='text-blue-500 hover:text-blue-300 flex hover:cursor-pointer'
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
            <DroppingArea
            onDrop={()=>onDrop(0)}
            />
            {links?.map((link,index)=>{ return (
            <React.Fragment key={index}>
                <LinkCard
              key={link._id}
              link={link}
              onDelete={handleDelete}
              onToggle = {(id)=>link.active ? handleDeactivate(id) : handleActivate(id)}
              onEdit={(link)=>handleeditlink(link)}
              index={index}
              setactiveCard={setactiveCard}
              />
            <DroppingArea
            onDrop={()=>onDrop(index+1)}
            />
            </React.Fragment>
            )})
            }
            </div>
      </motion.div>
      {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
      <motion.button initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className='bg-red-500 text-white w-full mt-3 rounded-2xl py-3 hover:bg-red-400 hover:cursor-pointer' onClick={handleLogout}>Logout</motion.button>
    </div>
  )
}

export default DashboardPage