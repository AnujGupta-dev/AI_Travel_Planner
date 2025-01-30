import React from 'react'
import PlaceCardItem from './PlaceCardItem';

function TripPlace({trip}) {
  return (
    <div className='my-4'>
      <h2 className='font-bold text-xl'>Places to Visit</h2>
      <div>
        {trip?.travelPlan?.itinerary?.map((item,i)=>(
            <div key={i}>
                <h2 className='font-medium text-l'>Day {item.day} </h2>
                <h2 className='font-medium text-l'>Best Time to visit :- {item.bestTimeToVisit} </h2>
                <div className='grid md:grid-cols-2 gap-4'>
                        {item.places?.map((place,index)=>(
                          <PlaceCardItem place={place} key={index}/>
                        ))}
                    </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default TripPlace