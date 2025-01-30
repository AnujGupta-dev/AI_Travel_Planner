import axios from 'axios';
import React, { useContext, useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import TripPlace from '../components/TripPlace';
import { viewTripContext } from '../../context/context';

const ViewTrip = () => {
  const {tripId} = useParams();
  const [Trip, setTrip] = useState([])
  const {i}= useContext(viewTripContext)

 const val = Array.from(tripId)
  let idx = val[24] ;
  console.log(idx)

  useEffect(()=>{
      axios.post("/api/getuser",{
        token : localStorage.getItem('token'),
        _id:tripId
      }).
      then((res)=>{
        let length = (res.data.data.travelHistory).length
        if(idx){
          length = idx;
        }
        setTrip(JSON.parse(res.data.data.travelHistory[length-1])[0]);
      }).catch((err)=>{
        console.log(err)
      })
  },[tripId])
  return (
    <div className='p-10 md:px-20 lg:px-44  xl:px-56'>
        <InfoSection trip={Trip} />
        <Hotels trip={Trip}/>
        <TripPlace trip={Trip}/>
    </div>
  )
}

export default ViewTrip