"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { viewTripContext } from "../context/context";
import { Login } from "./login";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function SignUp() {
  const [openModal, setOpenModal] = useState(true);
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [phoneno, setphoneno] = useState('');
  const {signIn,setsignIn,logIn, setlogIn} = useContext(viewTripContext)
  const [loading, setLoading] = useState(false)

  function onCloseModal() {
    setOpenModal(false);
    setsignIn(false)
    setEmail('');
  }
  
  useEffect(()=>{
    if(signIn){
      setOpenModal(signIn);
    }
  },[signIn])

  const saveToDb = async () => {
    if(email && Password && phoneno  && name ){
      setLoading(true)
      axios
      .post('/api/signup', {
        email: email,
        password: Password,
        phoneno: phoneno,
        name: name
      })
      .then(function (response) {
        setlogIn(true)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false)
        toast(error.response.data.message)
      });
    }else{
      toast("Please fill all details")
    }
  };
  const handleLoginAccountClick = () => {
    setOpenModal(false);
    setsignIn(false)
    setlogIn(true)
  }

  return (
        <>
        {signIn ? <>
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign Up to our platform</h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Your name" />
                </div>
                <TextInput
                  id="name"
                  placeholder="Sam"
                  value={name}
                  onChange={(event) => setname(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phoneno" value="Your Phone Number" />
                </div>
                <TextInput
                  id="phoneno"
                  placeholder=""
                  value={phoneno}
                  onChange={(event) => setphoneno(event.target.value)}
                  required
                />
              </div>
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
                <TextInput
                  id="password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <Button onClick={saveToDb}>Sign Up</Button>
              </div>
              <div className="flex justify-end text-sm font-medium text-gray-500 dark:text-gray-300">
                <button
                  href="#"
                  className="text-cyan-700 hover:underline dark:text-cyan-500"
                  onClick={handleLoginAccountClick} 
                >
                  {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Login to your account'}
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>:<Login/>}
      <ToastContainer/>
    </>
  );
}
