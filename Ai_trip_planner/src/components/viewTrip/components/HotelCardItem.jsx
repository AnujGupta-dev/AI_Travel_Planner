// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function HotelCardItem({item}) {
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
          setPhotoUrl(`https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photo_reference}&maxwidth=400&key=${import.meta.env.VITE_gomapskey}`);
      }
  }, [photo_reference]);

      useEffect(()=>{
         GetPhoto(`${item?.hotelName},${item?.hotelAddress}`);
      },[item])
  return (
    <div>
      <Link to={'https://www.google.com/maps/search/?api=1&query='+item?.hotelName+ "," +item?.hotelAddress} target='_blank'>
                    <div className='hover:scale-105 transition-all cursor-pointer'>
                        <img src={photoUrl ? photoUrl : '/public/hotel.jpeg'} onError={e => { e.target.onerror = null; e.target.src = '/road-trip-vacation.jpg'; }} className='rounded-xl h-[180px] w-full object-cover'/>
                        <div className='my-3 py-2'>
                            <h2 className='font-medium'>{item?.hotelName}</h2>
                            <h2 className='text-xs text-gray-500'>📍{item?.hotelAddress} </h2>
                            <h2 className='text-sm'>💰{item?.price}</h2>
                            <h2 className='text-sm'>⭐{item?.rating} </h2>
                        </div>
                    </div>
        </Link>    
    </div>
  )
}

export default HotelCardItem