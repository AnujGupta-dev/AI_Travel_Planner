import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div className='w-[100vw]'>
        <h2 className='font-bold text-xl my-7'>Hotel Recommendation</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-[80%]'>
            {trip?.travelPlan?.hotelOptions?.map((item,index) =>(
                 <HotelCardItem item={item} key={index}/>
                ))}
        </div>
    </div>
  )
}

export default Hotels