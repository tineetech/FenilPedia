import React, { useEffect, useState } from 'react'

const Splash = () => {
const [isHide, setIsHide] = useState(false)
useEffect(() => {
    setTimeout(() => {
        setIsHide(true)
    }, 5000);
}, [])
  return (
    <div className={`${isHide ? "hidden" : 'flex'} w-screen items-end justify-center animation-splash2 h-screen fixed top-0 left-0 bg-white z-70`}>
        <div className='text-black w-full items-center justify-center flex text-center h-screen'>
            <h1 className='text-6xl font-bold animation-splash3'>FinelPedia</h1>
        </div>
        <div className='bg-teal-400 absolute left-0 w-full animation-splash1'>
        </div>
    </div>
  )
}

export default Splash