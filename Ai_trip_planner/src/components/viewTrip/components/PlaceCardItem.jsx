import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
    const [photo_reference, setphoto_reference] = useState('')
    const [photoUrl, setPhotoUrl] = useState('');

    const GetPhoto = async (location) => {
        axios.get(`https://maps.gomaps.pro/maps/api/place/textsearch/json?query=${location}&key=${import.meta.env.VITE_gomapskey}`)
            .then((res) => {
                setphoto_reference(res.data.results[0].photos[0].photo_reference)
            }).catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        if (photo_reference) {
            setPhotoUrl(`https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photo_reference}&maxwidth=400&key=${import.meta.env.VITE_gomapskey}`);
        }
    }, [photo_reference]);

    useEffect(() => {
        GetPhoto(`${place?.placeName}`);
    }, [place])

    console.log(photoUrl)
    return (
        <div className=''>
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName + "," + place?.geoCoordinates} target='_blank'>
                <div className='my-4 bg-gray-50 p-2 gap-2 border rounded-lg flex flex-col flex-wrap hover:scale-105 transition-all hover:shadow-md cursor-pointer '>
                    <div className='py-2 mx-3'>

                        <img src={photoUrl ? photoUrl : '/road-trip-vacation.jpg'}
                            onError={e => { e.target.onerror = null; e.target.src = '/road-trip-vacation.jpg'; }}
                            className='w-[400px] h-[240px] rounded-xl object-cover'/>

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