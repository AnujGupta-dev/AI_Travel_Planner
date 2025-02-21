
"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import axios from 'axios';
import { SignUp } from "./SignUp";
import { ToastContainer, toast } from 'react-toastify';
import { viewTripContext } from "../context/context";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export function Login() {
  const [openModal, setOpenModal] = useState(true);
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('')
  const {logIn, setlogIn,signIn, setsignIn , setMessage} = useContext(viewTripContext)
  const [loading, setloading] = useState(false)
  
  function onCloseModal() {
    setsignIn(false)
    setlogIn(false)
    setOpenModal(false);
    setEmail('');
  }

  const checkInDb = async ()=>{
         if(email && Password){
          setloading(true)
          axios.post('/api/login', {
            email: email,
            password : Password
          })
          .then(function (response) {
            toast("Logged in sucessfully")
            localStorage.setItem('token',response.data.token)
            setloading(false)
            onCloseModal();
          })
          .catch(async function (error) {
            setloading(false)
            if(error.response.status == 401 || error.response.status == 402)
            {
              setOpenModal(false)
              setsignIn(true)
              setlogIn(false)
              setMessage(error.response.data.message)
            }          
          });
         }else{
          toast("Please fill all details")
        }
  }

  const handleCreateAccountClick = () => {
    setOpenModal(false);
    setsignIn(true)
    setlogIn(false)
  }


  return (
    <>
      {logIn?
      <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" onChange={(event) => setPassword(event.target.value)} required />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button onClick={checkInDb}>  {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Log in to your account'} </Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <button onClick={handleCreateAccountClick} className="text-cyan-700 hover:underline dark:text-cyan-500">
              Create account
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </> : <SignUp/>}
      <ToastContainer/>
    </>
  );
}
