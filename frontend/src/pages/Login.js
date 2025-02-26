import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const navigate = useNavigate(); 
   

 
  const [loginInfo, setLoginInfo] = useState({ 
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo); 
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      handleError("Email or Password are required !");
    } else {

      try {
        const url = "http://localhost:8080/auth/login"
        const response = await fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginInfo)
        })

        const { success, message, email, name, jwtToken,error } = await response.json();
       
        if (success) {
          localStorage.setItem('jwt_token',jwtToken);
          localStorage.setItem('name',name);
          localStorage.setItem('email',email); 
          localStorage.setItem('isLogedIn',true);
          handleSuccess(message);
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        }else if(error){
          handleError(error.details[0].message);
        } else {
          handleError(message);
        }

      } catch (error) {
        handleError(error);
      }

    }


  }



  return <>
    <div className='container' >
      <h1>Login </h1>
      <form onSubmit={handleSubmitForm} >
        <div>
          <label htmlFor='email' >Email</label>
          <input
            type='email'
            onChange={handleInput}
            name="email"
            autoFocus
            placeholder="Enter Your Email ..."
          />
        </div>
        <div>
          <label htmlFor='password' >Password</label>
          <input
            type='password'
            onChange={handleInput}
            name="password"
            placeholder="Enter Your password ..."
          />
        </div>
        <button type="submit" > Login</button>
        <span>Don't have an account ? <Link to="/signup" >Sign Up</Link> </span>
      </form>
      <ToastContainer />
    </div>
  </>
}


export default Login; 