import React, { useContext, useState } from 'react'
import { SignUp } from '../SignUp/SignUp'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { viewTripContext } from '../context/context';
import { Login } from '../SignUp/login';
const Header = () => {

  const {signIn, setsignIn,logIn} = useContext(viewTripContext)
  return (
  <>
    <div className=' h-[100px] m-0 p-4 pl-9 pr-9 flex justify-between'>
    <img src="/logo-b.webp" className='h-full'/>
    <div className='flex justify-between w-[40%] items-center text-[1.5rem] text-gray-500 font-bold'>
      <Link to={'/'}><span className=' hover:text-black'>Home</span></Link>
      <a href='#faq'><span className=' hover:text-black'>Faq</span></a>
      <a href='#contactus'><span className=' hover:text-black'>Contact Us</span></a>
      <button  onClick={()=>{setsignIn(true)}} className='border-none hover:text-black'>Sign In</button>
      <Link to={'profile'}><div className='flex items-center justify-center'><AccountCircleIcon style={{fontSize:'3rem'}}/></div></Link>
    </div>
   </div> 
   {signIn?<SignUp/>:""}
   {logIn?<Login/>:""}
   </>
  )
}

export default Header