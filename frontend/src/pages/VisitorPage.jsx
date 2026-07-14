import React from 'react'
import LinkCardVisitor from '../components/LinkCardVisitor'
import { getUserLinksPublic} from '../redux/publicProfileSlice'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const VisitorPage = () => {

  const {name} = useParams()
  const {user,links,isLoading} = useSelector((state)=>state.publicProfile)
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(getUserLinksPublic(name))
  }, [name,dispatch])
  
  if(isLoading || !user){
    return <p>Loading...</p>
  }

  return (
    <div className='w-full'>
          <div className='flex flex-col justify-center items-center gap-1.5'>
            <img className='rounded-full'/>
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