import React from 'react'
import { ToggleRight,ToggleLeft,Trash2,PencilLine,Globe } from 'lucide-react'
import { useState } from 'react'

const LinkCard = () => {
  const [activate, setactivate] = useState(true)
  const [title, settitle] = useState(title)
  const [dest, setdest] = useState(dest)
  const toggleActivation = () => {
    setactivate(!activate)
  }
  return (
    <div className='flex'>
      <div className='flex flex-col'>
        <h1 className={activate ? 'text-white' : 'text-gray-500'}>{title}</h1>
        <p>{dest}</p>
      </div>  
        <button onClick={setactivate}>{activate ? <ToggleRight className='text-green-600'/> : <ToggleLeft className='text-gray-500'/>}</button>
        <PencilLine className='text-gray-700'/>
        <Trash2 className='text-gray-700'/>
    </div>
  )
}

export default LinkCard