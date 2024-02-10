import React, { useContext,useState} from 'react'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context } from '../../main';




const Ragistar = () => {

  const [email, setEmail] = useState("");
  const [fullName, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const {isAuthorized,setIsAuthorized,user,setUser} =useContext(Context)

  const handleRegister=async (e)=>{
    e.preventDefault()
    try {

      console.log("THis is registered calling ",fullName)

      const data=await axios.post(`/api/v1/user/register`,{fullName,password,email,role,mobile},
      {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      }
      )
      console.log("This is data section",data)
      toast.success(data.message);
      setName("")
      setEmail("")
      setPassword("")
      setMobile("")
      setRole("")
      setIsAuthorized(true) 
    } catch (error) {
       
      toast.error(error.response.data.message);
      
    }

    if(isAuthorized){
      return <Navigate to={'/'}/>
    }

    
  }


  return (
    <>
    <section className="authPage">
      <div className="container">
        <div className="header">
          <img src="/JobZeelogo.png" alt="logo" />
          <h3>Create a new account</h3>
        </div>
        <form>
          <div className="inputTag">
            <label>Register As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Jobseeker">Job seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className="inputTag">
            <label>Name</label>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={fullName}
                onChange={(e) => setName(e.target.value)}
              />
              <FaPencilAlt />
            </div>
          </div>
          <div className="inputTag">
            <label>Email Address</label>
            <div>
              <input
                type="email"
                placeholder="zk@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdOutlineMailOutline />
            </div>
          </div>
          <div className="inputTag">
            <label>Mobile Number</label>
            <div>
              <input
                type="Number"
                placeholder="12345678"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <FaPhoneFlip />
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiLock2Fill />
            </div>
          </div>
          <button type="submit" onClick={handleRegister}>
            Register
          </button>
          <Link to={"/login"}>Login Now</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/register.png" alt="login" />
      </div>
    </section>
  </>

  )
}

export default Ragistar