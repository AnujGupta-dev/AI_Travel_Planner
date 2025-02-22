import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Login } from '../SignUp/login';
import { ToastContainer, toast } from 'react-toastify';
import { viewTripContext } from '../context/context';
import { useNavigate } from 'react-router-dom';



const Profile = () => {
    const [data, setData] = useState([])
    const { seti } = useContext(viewTripContext)
    const [id, setId] = useState('')
    const [photos, setPhotos] = useState({}) // Store photos by trip id
    const navigate = useNavigate();

    const {setlogIn , logIn } = useContext(viewTripContext)
    

    useEffect(() => {
        axios.post("/api/getuser", {
            token: localStorage.getItem('token'),
        })
            .then((res) => {
                setData(res.data.data.travelHistory)
                setId(res.data.data._id)
            })
            .catch(function (error) {
                toast(error.response.data.message);
                if (error.response.status === 401 || error.response.status === 402) {
                    setlogIn(true)
                    localStorage.setItem('token', '')
                }
            });
    }, [])

    const viewTripfn = (key) => {
        console.log(id)
        console.log(key)
        seti(key+1)
        if (id) {
            navigate('/view-trip/' + id + key)
        }
    }

    const GetPhoto = async (location) => {
        try {
            const response = await axios.get(`https://maps.gomaps.pro/maps/api/place/textsearch/json?query=${location}&key=${import.meta.env.VITE_gomapskey}`);
            return response.data.results[0]?.photos[0]?.photo_reference || null;
        } catch (err) {
            return null;
        }
    }

    const fetchPhotoUrl = async (location) => {
        const photoReference = await GetPhoto(location);
        if (photoReference) {
            return `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoReference}&maxwidth=600&key=${import.meta.env.VITE_gomapskey}`;
        }
        return null;
    }

    useEffect(() => {
        const fetchPhotos = async () => {
            const newPhotos = {};
            for (const elem of data) {
                const travelPlan = JSON.parse(elem)[0]?.travelPlan;
                if (travelPlan && travelPlan.location) {
                    const photoUrl = await fetchPhotoUrl(travelPlan.location);
                    if (photoUrl) {
                        newPhotos[travelPlan.location] = photoUrl;
                    }
                }
            }
            setPhotos(newPhotos);
        }

        fetchPhotos();
    }, [data])

    return (
        <>
            {logIn ? (
                <Login />
            ) : (
                <div className='flex items-center justify-center '>
                    <div className="flex flex-wrap gap-[2.5rem] w-[70%]">
                        {data && data.length > 0 ? (
                            data.map((elem, idx) => {
                                const travelPlan = JSON.parse(elem)[0]?.travelPlan;
                                if (!travelPlan) return null;

                                const photoUrl = photos[travelPlan.location] || '';

                                return (
                                    <div className=" lg:w-[300px]  w-[200px] h-[200px] rounded overflow-hidden shadow-lg  hover:scale-105 transition-all cursor-pointer" key={idx} onClick={() => { viewTripfn(idx) }}>
                                        <img className="w-full h-[250px]" src={photoUrl || './road-trip-vacation.jpg'} alt="Travel location" />
                                        <div className="px-6 py-4">
                                            <p className="font-bold text-xl mb-2">{travelPlan.location}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No travel history available.</p>
                        )}
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    )
}

export default Profile;
