import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import AuthForm from './pages/AuthForm'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppoinment  from './pages/MyAppoinment'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BookAppointment from './pages/BookAppointment'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path="/login" element={<AuthForm isSignup={false} />} />
        <Route path="/signup" element={<AuthForm isSignup={true} />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/myappointment' element={<MyAppoinment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/bookappointment' element={<BookAppointment/>} />
       </Routes>
       <Footer />
      
    </div>
  )
}

export default App