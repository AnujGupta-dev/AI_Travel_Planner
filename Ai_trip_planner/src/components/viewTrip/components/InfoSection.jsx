import axios from 'axios';
import React, { useState,useEffect } from 'react'

function InfoSection({trip}) {
    const [photo_reference, setphoto_reference] = useState('')
    const [photoUrl,setPhotoUrl] = useState('');
    const GetPhoto = async(location)=>{
        axios.get(`https://maps.gomaps.pro/maps/api/place/textsearch/json?query=${location}&key=${import.meta.env.VITE_gomapskey}`)
        .then((res)=>{
            setphoto_reference(res.data.results[0].photos[0].photo_reference)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(() => {
        if (photo_reference) {
            setPhotoUrl(`https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photo_reference}&maxwidth=600&key=${import.meta.env.VITE_gomapskey}`);
        }
    }, [photo_reference]);

        useEffect(()=>{
           GetPhoto(trip?.travelPlan?.location);
        },[trip])
  return (
    <div className='mt-[60px]'>
      <img src={photoUrl ? photoUrl : '/public/road-trip-vacation.jpg'}
         onError={e => { e.target.onerror = null; e.target.src = '/road-trip-vacation.jpg'; }} className='h-[330px] w-[60%]  object-cover rounded-xl'/>
       <div className='flex justify-between items-center'>
            <div className='my-6 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.travelPlan?.location}</h2>
                <div className='flex gap-6 mt-4'>
                    <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>🗓️ {trip?.travelPlan?.duration}</h2>
                    <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>👩‍👧‍👦 Number of Traveler : {trip?.travelPlan?.numberOfPeople} People</h2>
                    <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>💵 {trip?.travelPlan?.budget} Budget </h2>
                </div>
            </div>
       </div>
    </div>
  )
}

export default InfoSection