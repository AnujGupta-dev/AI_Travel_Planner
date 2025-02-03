import React, { useEffect, useState } from 'react'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '../Utilis/Options'
import '../Create_trip/create_trip.css'
import { ToastContainer, toast } from 'react-toastify';
import {chatSession } from '../../service/AiModel';
import AutoComplete from '../Utilis/autocomplete';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Login } from '../SignUp/login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create_trip = () => {
  const [formdata, setformdata] = useState({
    destination: '',
    NoOfDays: '',
    budget: '',
    traveler: ''
  })

  const [loading, setloading] = useState(false)
  const [dialog, setdialog] = useState(false)
  const [id, setid] = useState('')
  const [trip, settrip] = useState([])
  const [fetch, setFetch] = useState(false)

  const handleInputChange = (name, value) => {
    setformdata({
      ...formdata,
      [name]: value
    })
  }


  const notify = () => toast("!! Please fill all details ");

  const token = localStorage.getItem('token')

  const navigate = useNavigate();

  useEffect(() => {
      if(fetch){
      axios.put('/api/posthistory', {
        token: token,
        travelHistory : trip
      })
        .then(function (response) {
          setid(response.data.message._id)
          if(id){
            navigate('/view-trip/'+ id)
          }
        })
        .catch(function (error) {
          navigate('/create-trip/'+ id)
          toast(error.response.data.message);
          console.log(error.response);
          if(error.response.status == 401)
          {
              setdialog(true)
              setloading(false)
              localStorage.setItem('token','')
          }
        })
      }
  }, [trip,id])

  const generateTripBtn = async () => {
    setFetch(true)
    if (!formdata?.NoOfDays || !formdata?.budget || !formdata?.destination || !formdata?.traveler) {
      notify();
      return;
    }

    if (!token) {
      setdialog(true)
      setloading(false)
    }

    else {     
      setloading(true);
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formdata?.destination)
        .replace('{totalDays}', formdata?.NoOfDays)
        .replace('{traveler}', formdata?.traveler)
        .replace('{budget}', formdata?.budget)
      console.log(FINAL_PROMPT)
      console.log(apiKey)

      const result = await chatSession.sendMessage(FINAL_PROMPT)
      localStorage.setItem("data", JSON.stringify(result?.response?.text()));
      settrip(result?.response?.text())
      setloading(false);
      console.log(result?.response?.text())
    }
  }

  return (
    <>
      {dialog ? <Login /> : ''}
      <div className='w-[90%] m-auto mb-[70px]'>
        <div className='sm:px-10 md:px-32 lg:px-56 xl:x-10 px-5 mt-10'>
          <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
          <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

          <div className='mt-20 '>
            <div>
              <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
              <AutoComplete
                setDestination={(value) => handleInputChange('destination', value)} />
            </div>
            <div className='mt-[3rem]'>
              <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
              <input onChange={(e) => { return (handleInputChange('NoOfDays', e.target.value)) }} type="number" placeholder='Ex.3' className=' bg-[#c1bfbf] border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 inputspin' />
            </div>
            <div className='mt-[3rem]'>
              <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
              <div className="xl:grid grid-cols-3 gap-5 mt-5 mb-5 flex flex-wrap ) " id='mediaquery'>
                {SelectBudgetOptions.map((item, index) => (
                  <div key={index}
                    onClick={() => handleInputChange('budget', item.title)}
                    className={`cursor-pointer p-4 border rounded-lg md:(h-[150px] w-[200px])  sm:(h-[100px] w-[180px]) hover:shadow-lg
                ${formdata?.budget == item.title && 'shadow-lg border-cyan-500'}
                `}>
                    <h2 className="text-3xl">{item.icon}</h2>
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>
            <div className='mt-[3rem]'>
              <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
              <div className="xl:grid grid-cols-3 gap-5 mt-5  flex flex-wrap" id='mediaquery'>
                {SelectTravelList.map((item, index) => (
                  <div key={index}
                    onClick={() => handleInputChange('traveler', item.people)}
                    className={`cursor-pointer p-4 border rounded-lg min-w-[250px] sm:min-w-[200px] hover:shadow-lg
                  ${formdata?.traveler == item.people && 'shadow-lg border-cyan-500'}
                  `}>
                    <h2 className="text-3xl">{item.icon}</h2>
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex justify-end mt-[2rem]'>
              <button className='bg-black text-white text-[1rem] font-bold  border rounded-[1rem] p-4 align-middle' onClick={generateTripBtn} > {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Generate Trip'}</button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default Create_trip