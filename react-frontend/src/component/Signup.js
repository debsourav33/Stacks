import React, { Component, useState } from "react";
import Client from "../api-client/Client.js";
import "./login.css"
import {useNavigate} from "react-router-dom"
import "./common.css"

export default function Signup(){
    const [name, setName] = useState("");
    const [userId, setuserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const onNameChange = (event) => {
      setName(event.target.name);
    }

    const onUserIdChange = (event) => {
        setuserId(event.target.value);
    }
    
    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className="login-container">
          <div className="login-heading">Create an Account</div>
          <div className="input-container">
            <input 
            type="text" 
            name="name"
            onChange={onNameChange} />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-container">
            <input 
            type="text" 
            name="userId"
            value = {userId} 
            onChange={onUserIdChange} />
            <label htmlFor="userId">User ID</label>
          </div>
          <div className="input-container">
            <input 
            type="password" 
            name="password"
            value = {password} 
            onChange={onPasswordChange} />
            <label htmlFor="password">Password</label>
          </div>
          <button
            type="submit"
            className="login-button"
            onClick={attemptSignup}
          >
            Register
          </button>
          <div className="login-footer">
            <p>Already have an account? <a href="login">Login</a></p>
          </div>
        </div>
      );

    function attemptSignup(){

        console.log(userId);
        console.log(password);

        const client = new Client();
        const loginPromise = client.register(name,userId, password);
        loginPromise
        .then((res) => {         
            console.log(res);
            console.log("Navigating to login page");
            //client.setupAuthHeader(userId, password);

            //save credentials to localStorage
            storeCredential()
            
            //reset the input fields
            setuserId("")
            setPassword("")

            //succesful register will route to login page
            navigate("/login");
        })
        .catch((err) => console.log(`Failed! ${err}`));
    }

    //in case of page refresh, we need to update user header again
    //so store it in local storage
    function storeCredential(){
      localStorage.setItem("user",userId);
      localStorage.setItem("password",password)
    }
    
}