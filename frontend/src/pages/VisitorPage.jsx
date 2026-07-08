import React from 'react'
import LinkCardVisitor from '../components/LinkCardVisitor'

const VisitorPage = () => {
  return (
    <div>
        <div className='flex flex-col'>
            <img className='rounded-full'/>
            <h1 className='font-semibold'></h1>
            <p></p>
            <p className='text-blue-600'></p>
        </div>

        <div>
            <LinkCardVisitor/>
        </div>
    </div>
  )
}

export default VisitorPage