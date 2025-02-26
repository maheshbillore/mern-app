import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Signup() {

  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }

  const handleSignUpform = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      handleError("Name email and password are required");
    } else {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo),
      });
      const { success, error,message } = await response.json(); 
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 5000); 
      } else if (error) {   
        handleError(message); 
        handleError(error.details[0].message);
      } else {
        handleError(message);
      }
    }
  }


  return <>
    <div className='container' >
      <h1>Sign up</h1>
      <form onSubmit={handleSignUpform} >
        <div>
          <label htmlFor='name' >Name</label>
          <input
            type='text'
            name="name"
            onChange={handleChangeInput}
            autoFocus
            value={signupInfo.name}
            placeholder="Enter Your name ..."
          />
        </div>
        <div>
          <label htmlFor='email' >Email</label>
          <input
            type='email'
            name="email"
            value={signupInfo.email}
            onChange={handleChangeInput}
            placeholder="Enter Your Email ..."
          />
        </div>
        <div>
          <label htmlFor='password' >Password</label>
          <input
            type='password'
            name="password"
            value={signupInfo.password}
            onChange={handleChangeInput}
            placeholder="Enter Your password ..."
          />
        </div>
        <button type="submit" > Signup</button>
        <span>Already have an account ? <Link to="/login" >login</Link> </span>
      </form>
      <ToastContainer />
    </div>
  </>
}


export default Signup; 