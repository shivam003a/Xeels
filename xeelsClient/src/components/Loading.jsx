import React from 'react'
import './Loading.css'

const Loading = () => {
  return (
    <div className='w-full h-screen bg-white flex flex-col gap-3 justify-center items-center'>
      <div className='loader'></div>
      <div className='text-2xl font-semibold logo'>XEELS</div>
    </div>
  )
}

export default Loading
