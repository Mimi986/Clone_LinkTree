import React from 'react'

const Input = ({...props}) => {
  return (
    <div className='mb-6'>
        <input {...props} className='bg-[#435d8b] border rounded-2xl focus:border-gray-500 focus:ring-gray-500 placeholder-gray-700 border-gray-700 w-full pl-5 pr-3 py-2 focus:ring-2 focus:outline-none
        autofill:shadow-[inset_0_0_0px_1000px_#3b4f74] autofill:text-white
        '/>
    </div>
  )
}

export default Input