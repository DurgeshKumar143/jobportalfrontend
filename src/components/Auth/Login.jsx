import React, { useContext, useEffect, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import {toast,Toaster} from "react-hot-toast"
import axios from "axios";
import {HashLoader} from "react-spinners"
import { Context } from "../../main";
import Swal  from "sweetalert2"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
   document.title=`Login`

  },[])
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      setLoading(true)
      console.log("This is  first login cheack")
      const { data } = await axios.post(
        "/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLoading(false)
      
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
      toast.success(`Welcome back ${data.user.fullName}`);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Login successFully",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/")
      
    } catch (error) {

      if(error.response && error.response.status === 403){
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: `User not found`,
          showConfirmButton: false,
          timer: 1500
        });

      }else{
        
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: `Error fetching data ,${error.data}`,
          showConfirmButton: false,
          timer: 1500
        });

      }

       

      // toast.error(error.message);
      
      setLoading(false)
       
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }
   
  
  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />
            <h3>Login to your account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="dk@gmail.com"
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)}}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleLogin} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              {loading ? <HashLoader size={25} color="white"/>: <span>Login</span>}
            </button>
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;
