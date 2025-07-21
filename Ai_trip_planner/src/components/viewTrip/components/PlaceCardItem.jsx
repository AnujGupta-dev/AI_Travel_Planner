import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../../../api/axios';

function PlaceCardItem({ place }) {
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
        GetPhoto(place?.placeName + ' ' + place?.geoCoordinates);
    }, [place])

    return (
        <div className=''>
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName + "," + place?.geoCoordinates} target='_blank'>
                <div className='my-4 bg-gray-50 p-2 gap-2 border rounded-lg flex flex-col flex-wrap hover:scale-105 transition-all hover:shadow-md cursor-pointer '>
                    <div className='py-2 mx-3'>

                        <img src={photoUrl ? photoUrl : '/road-trip-vacation.jpg'}
                            onError={e => { e.target.onerror = null; e.target.src = '/road-trip-vacation.jpg'; }}
                            className='w-[400px] h-[240px] rounded-xl object-cover' />

                    </div>
                    <div>
                        <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                        <h2 className='font-bold'>{place.placeName}</h2>
                        <p className='text-sm text-gray-500'>{place.placeDetails}</p>
                        <h2 className='text-blue-700 text-sm'>{place.ticketPricing}</h2>
                        <h2 className='text-sm text-yellow-500'>⭐{place.rating}</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PlaceCardItem