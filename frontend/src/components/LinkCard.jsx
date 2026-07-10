import React from 'react'
import { ToggleRight,ToggleLeft,Trash2,PencilLine,Globe } from 'lucide-react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {deleteLink,activateLink,deactivateLink} from '../redux/linkSlice'

const LinkCard = () => {
  const [activate, setactivate] = useState(true)
  const [title, settitle] = useState(title)
  const [dest, setdest] = useState(dest)

  const dispatch = useDispatch()

  const handleDelete = ()=>{
    dispatch(deleteLink({id}))
  }

  const handleActivate = () => {
    dispatch(activateLink({id}))
  }

  const handleDeactivate = ()=>{
    dispatch(deactivateLink({id}))
  }
  const toggleActivation = () => {
    setactivate(!activate)
  }
  return (
    <div className='flex'>
      <div className='flex flex-col'>
        <h1 className={activate ? 'text-white' : 'text-gray-500'}>{title}</h1>
        <p>{dest}</p>
      </div>  
        <button onClick={setactivate}>{activate ? <ToggleRight className='text-green-600' onClick={handleDeactivate}/> : <ToggleLeft className='text-gray-500' onClick={handleActivate}/>}</button>
        
        <button><PencilLine className='text-gray-700'/></button>
        <button onClick={handleDelete}><Trash2 className='text-gray-700'/></button>
    </div>
  )
}

export default LinkCard