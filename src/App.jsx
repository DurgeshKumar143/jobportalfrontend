import React, { useContext, useEffect } from 'react'
import {Context} from "./main"

import {BrowserRouter as Router ,Route, Routes} from "react-router-dom"
import Login from "./components/Auth/Login"
import Registion from "./components/Auth/Ragistar"
import Footer from "./components/Layout/Footer"
import Navbar from "./components/Layout/Navbar"
import Home from "./components/Home/Home"
import Jobs from "./components/Job/Jobs"
import JobDetails from "./components/Job/JobDetails"
import MyJob from "./components/Job/MyJobs"
import PostJob from "./components/Job/PostJobs"
import Application from "./components/Application/Application"
import MyApplication from "./components/Application/MyApplication"
import NotFound from "./components/NotFound/NotFound"
import axios from "axios"
import {Toaster,  toast } from "react-hot-toast"
import "./App.css";
import "./index.css"
import 'sweetalert2/src/sweetalert2.scss'



const App = () => {
const {isAuthorized,setIsAuthorized,SetUser}=useContext(Context)

  useEffect(()=>{
    const fetchUser=async ()=>{
      try {
          
        const response=await axios.get("/api/v1/user/getuser",{withCredentials:true}) 
       
        SetUser(response.data.user)
        setIsAuthorized(true)
         
        
      } catch (error) {
        
        setIsAuthorized(false)      
      }
    };
    fetchUser();
  },[isAuthorized])



  return (
     <>
     <Toaster toastOptions={{duration:3000}}/>
     <Router>
     <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Registion/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/jobs/getall' element={<Jobs/>} />
        <Route path='/job/:id' element={<JobDetails/>} />
        <Route path='/job/post' element={<PostJob/>}/>
        <Route path='/job/me' element={<MyJob/>} />
        <Route path='/application/:id' element={<Application/>} />
        <Route path='/application/me' element={<MyApplication/>} />
        <Route path='/*' element={<NotFound/>} />

        
      </Routes>
      <Footer/>
      
     </Router>
      
       
     </>
  )
}

export default App