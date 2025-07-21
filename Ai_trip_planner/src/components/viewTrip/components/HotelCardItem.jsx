// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../api/axios';


function HotelCardItem({ item }) {
    const [photoUrl, setPhotoUrl] = useState('');

    const GetPhoto = async (location) => {
        await api.get(`https://api.unsplash.com/search/photos?query=${location}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`)
            .then((res) => {
                const data = res.data;
                if (data.results.length > 0) {
                    setPhotoUrl(data.results[0].urls.small);
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        GetPhoto(item?.hotelName + ' ' + item?.hotelAddress);
    }, [item])

    return (
        <div>
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + item?.hotelName + "," + item?.hotelAddress} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img src={photoUrl ? photoUrl : '/public/hotel.jpeg'} onError={e => { e.target.onerror = null; e.target.src = '/road-trip-vacation.jpg'; }} className='rounded-xl h-[180px] w-full object-cover' />
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