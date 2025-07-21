import React, { useEffect ,useState} from 'react'
import api from '../api/axios';

const Test = () => {
    const [jokes, setJokes] = useState([]);
    useEffect(()=>{
        api.get('/api/jokes')
        .then((response)=>{
            console.log(response.data)
            setJokes(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

  return (
    <>
        <h1>Jokes are here</h1>
        {jokes.map((joke,idx)=>(
            <div key={idx}>
                <h3>{joke.title}</h3>
                <p>{joke.joke}</p>
            </div>
           )
        )}
    </>
  )
}

export default Test