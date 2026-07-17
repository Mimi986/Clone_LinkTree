import React from 'react'
import LinkCardVisitor from '../components/LinkCardVisitor'
import { getUserLinksPublic} from '../redux/publicProfileSlice'
import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const VisitorPage = () => {

  const {name} = useParams()
  const {user,links,isLoading,error} = useSelector((state)=>state.publicProfile)
  const dispatch=useDispatch()
 
   const [photo, setphoto] = useState(null)
   const [preview, setpreview] = useState(null)

  useEffect(() => {
    dispatch(getUserLinksPublic(name))
  }, [name,dispatch])
  
  if(isLoading){
    return <p>Loading...</p>
  }

  if(!user || error){
    return <p>This profile doesn't exist</p>
  }

  const getPhotoUrl = (photo) => {
    if(!photo) return null 
    if(photo.startsWith('http')) return photo
    return `http://localhost:3000${photo}`
  }

  return (
    <div className='w-full'>
          <div className='flex flex-col justify-center items-center gap-1.5'>
            <img className='rounded-full w-20 h-20 mb-5' src={getPhotoUrl(user.photo)} alt={user.name}/>
            <h1 className='font-semibold text-[30px] font-serif'>{user.name}</h1>
            <p className='text-gray-700'>{user.bio}</p>
            <p className='text-blue-900 text-[17px] font-serif'>{user.email}</p> 
          <div>
           {links?.map((link)=>{
            return (<LinkCardVisitor
            link={link}
            key={link._id}
            />)
           })}  
        </div>
        </div>
    </div>
  )
}
export default VisitorPage