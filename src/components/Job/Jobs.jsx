import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import {MoonLoader,FadeLoader,RotateLoader,PacmanLoader} from "react-spinners"


const override = {
  display: "block",
  margin: "0 auto",
  
 
  
};


const Jobs = () => {

  useEffect(()=>{
    document.title=`Jobs`
  },[])



  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      setLoading(true);
      console.log('Loading... is true');
      axios
        .get("/api/v1/jobs/jobs", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
          
        });
        setLoading(false);
        
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
       
      <div className="container">
      <h1>ALL AVAILABLE JOBS</h1>
      {loading ? <PacmanLoader cssOverride={override} size={70} color='blue'/>:
       <div className="banner">

       {jobs.jobs &&
         jobs.jobs.map((element) => {
           return (
             <div className="card" key={element._id}>
               <p>{element.title}</p>
               <p>{element.category}</p>
               <p>{element.country}</p>
               <Link to={`/job/${element._id}`}>Job Details</Link>
             </div>
           );
         })}
     </div>}
     
    </div>
    
    
  </section>

    
  );
};

export default Jobs;
