import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Login } from '../SignUp/login';
import { ToastContainer, toast } from 'react-toastify';
import { viewTripContext } from '../context/context';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [data, setData] = useState([]);
    const { seti, setlogIn, logIn } = useContext(viewTripContext);
    const [id, setId] = useState('');
    const [photos, setPhotos] = useState({});
    const navigate = useNavigate();

    // Get user travel history
    useEffect(() => {
        axios.post("/api/getuser", {
            token: localStorage.getItem('token'),
        })
            .then((res) => {
                setData(res.data.data.travelHistory);
                setId(res.data.data._id);
            })
            .catch((error) => {
                toast(error.response?.data?.message || "An error occurred");
                if (error.response?.status === 401 || error.response?.status === 402) {
                    setlogIn(true);
                    localStorage.setItem('token', '');
                }
            });
    }, []);

    // Navigate to trip detail
    const viewTripfn = (key) => {
        seti(key + 1);
        if (id) {
            navigate('/view-trip/' + id + key);
        }
    };

    // Fetch image from Unsplash
    const GetPhoto = async (location) => {
        try {
            const res = await axios.get(`https://api.unsplash.com/search/photos?query=${location}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`);
            if (res.data.results.length > 0) {
                return res.data.results[0].urls.small;
            }
            return null;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    // Fetch and store photos for all trips
    useEffect(() => {
        const fetchPhotos = async () => {
            const newPhotos = {};
            for (const elem of data) {
                const travelPlan = JSON.parse(elem)[0]?.travelPlan;
                if (travelPlan && travelPlan.location) {
                    const photoUrl = await GetPhoto(travelPlan.location);
                    if (photoUrl) {
                        newPhotos[travelPlan.location] = photoUrl;
                    }
                }
            }
            setPhotos(newPhotos);
        };

        if (data.length > 0) {
            fetchPhotos();
        }
    }, [data]);

    return (
        <>
            {logIn ? (
                <Login />
            ) : (
                <div className='flex items-center justify-center mt-9 mb-9'>
                    <div className="flex flex-wrap gap-[2.5rem] w-[70%]">
                        {data && data.length > 0 ? (
                            data.map((elem, idx) => {
                                const travelPlan = JSON.parse(elem)[0]?.travelPlan;
                                if (!travelPlan) return null;

                                const photoUrl = photos[travelPlan.location] || './road-trip-vacation.jpg';

                                return (
                                    <div
                                        className="w-[300px] rounded overflow-hidden shadow-lg hover:scale-105 transition-all cursor-pointer"
                                        key={idx}
                                        onClick={() => viewTripfn(idx)}
                                    >
                                        <img
                                            className="w-full h-[250px] object-cover"
                                            src={photoUrl}
                                            onError={e => { e.target.onerror = null; e.target.src = '/road-trip-vacation.jpg'; }}
                                            alt={travelPlan.location}
                                        />
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
    );
};

export default Profile;
