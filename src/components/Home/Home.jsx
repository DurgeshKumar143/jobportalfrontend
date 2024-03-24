import React, { useContext, useEffect } from 'react'
import { Context } from '../../main'
import {Navigate} from "react-router-dom"
import HeroSection from './HeroSection'
import HowItWorks from './HowItWork'
import PopularCompanies from './PopularCompanies'
import PopularCategories from './PopularCategory'

const Home = () => {

  useEffect(()=>{
    document.title=`Home`

  },)
  const {isAuthorized} =useContext(Context)
  if(!isAuthorized){
    return <Navigate to={'/login'}/>
  }

  return (
    <>
    <section className="homePage page">
    <HeroSection/>
    <HowItWorks/>
    <PopularCompanies/>
    <PopularCategories/>
    
    
    
    
    </section>

        
    </>
  )
}

export default Home