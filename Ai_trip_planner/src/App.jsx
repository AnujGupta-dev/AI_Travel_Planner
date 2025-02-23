import { Route, Routes } from 'react-router'
import Hero from './components/Hero/Hero'
import Create_trip from './components/Create_trip/Create_trip'
import Layout from './components/Utilis/Layout'
import Test from './test/Test'
import ViewTrip from './components/viewTrip/[tripId]'
import Profile from './components/Profile/Profile'
import { viewTripContext } from './components/context/context'
import { useState } from 'react'
import HTMLcontent from './components/Utilis/HTMLcontent'

function App() {
  
  const [i, seti] = useState('')
  const [signIn, setsignIn] = useState(false)
  const [logIn, setlogIn] = useState(false)
  const [message, setMessage] = useState('')
  
  return (
    <viewTripContext.Provider value={{i,seti,setsignIn,signIn,logIn, setlogIn , message, setMessage}}>
        <Routes>
        <Route path='/test' element={<Test/>}/>
        <Route path='/' element={<Layout/>}>
          <Route path='' element={<Hero/>}/>
          <Route path='create-trip' element={<Create_trip/>}/>
          <Route path='view-trip/:tripId' element={<ViewTrip/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='explore' element={<HTMLcontent/>}/>
      </Route>
    </Routes>
    </viewTripContext.Provider>
   
  )
}

export default App
