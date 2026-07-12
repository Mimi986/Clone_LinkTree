import React from 'react'
import LinkCardVisitor from '../components/LinkCardVisitor'
import { getAllUsers } from '../redux/userSlice'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getAllLinks } from '../redux/linkSlice'

const VisitorPage = () => {
  const {list} = useSelector((state)=>state.users)
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <div>
      {list?.map((user)=>{ return (
        <div key={user._id}>
        <div className='flex flex-col justify-center items-center'>
            <img className='rounded-full'/>
            <h1 className='font-semibold'>{user.name}</h1>
            <p className='text-gray-300'>{user.bio}</p>
            <p className='text-blue-600'>{user.email}</p>
        </div>

        <div>
        <LinkCardVisitor/>
        </div>
        </div>)})}
    </div>
  )
}

export default VisitorPage