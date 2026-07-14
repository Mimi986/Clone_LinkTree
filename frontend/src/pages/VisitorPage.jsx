import React from 'react'
import LinkCardVisitor from '../components/LinkCardVisitor'
import { getUserWithLinks } from '../redux/publicProfileSlice'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

const VisitorPage = () => {

  const {usersWithLinks} = useSelector((state)=>state.publicProfile)
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(getUserWithLinks())
  }, [dispatch])
  

  return (
    <div className='w-full'>
        {usersWithLinks.map(({user,links})=>{ return (
          <div className='flex flex-col justify-center items-center gap-1.5'
          key={user._id}>
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
        )})}
    </div>
  )
}
export default VisitorPage