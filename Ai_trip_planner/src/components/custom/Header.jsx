import React, { useContext, useState } from 'react'
import { SignUp } from '../SignUp/SignUp'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { viewTripContext } from '../context/context';
import { Login } from '../SignUp/login';
import { HashLink } from 'react-router-hash-link';

const Header = () => {

  const {signIn, setsignIn,logIn} = useContext(viewTripContext)
  return (
  <>
    <div className=' h-[70px] 2xl:h-[100px] xl:h-[100px] md:h-[100px]  m-0 p-4 pl-9 pr-9 flex justify-between'>
    <img src="/logo-b.webp" className='h-full'/>
    <div className='flex justify-between xl:w-[40%] gap-5 items-center text-[1.2rem] 2xl:text-[1.5rem] xl:text-[1.5rem] md:text-[1.5rem] text-gray-500 font-bold'>
      <Link to={'/'}><span className=' hover:text-black'>Home</span></Link>
      <Link to={'explore'}><span className=' hover:text-black'>Explore</span></Link>
      <HashLink to='/#faq'><span className=' hover:text-black'>Faq</span></HashLink>
      <HashLink to='/#contactus'><span className=' hover:text-black'>Contact Us</span></HashLink>
      <button  onClick={()=>{setsignIn(true)}} className='border-none hover:text-black'>Sign In</button>
      <Link to={'profile'}><div className='flex items-center justify-center text-[2rem]  2xl:text-[3rem] xl:text-[3rem] md:text-[3rem] '><AccountCircleIcon style={{fontSize:'100%'}}/></div></Link>
      
    </div>
   </div> 
   {signIn?<SignUp/>:""}
   {logIn?<Login/>:""}
   </>
  )
}

export default Header