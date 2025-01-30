import React from 'react'
import {Link} from 'react-router-dom'
import Footer1 from '../custom/Footer'

const Hero = () => {
  return (
      <>
      <div className="flex flex-col items-center mx-57 gap-9">
      <h1
      className="font-extrabold text-[50px] text-center mt-16">
        <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> <br></br> Personalized Itineraries at Your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator,creating custom itineraries tailored to your interests and budget.</p>
        <Link to={'create-trip'}>
          <button className='bg-black text-white border rounded-md p-3 font-bold hover:bg-gray-600 hover:scale-105'>Get Started, It's Free.</button>
        </Link>
        <div className='flex items-center justify-center w-[100vw] h-[100vh]'>
          <img src='/landing.png' className='w-[70%] h-[80%] absolute right-[17%]'/>
        </div>
       </div>
       <Footer1/>
      </>
  
  )
}

export default Hero