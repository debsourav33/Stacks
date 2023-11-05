import React, { Component, useState } from "react";
import Client from "../api-client/Client.js";
import "./login.css"
import {useNavigate} from "react-router-dom"
import "./common.css"

export default function Login(){
    const [userId, setuserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const onUserIdChange = (event) => {
        setuserId(event.target.value);
    }
    
    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className="login-container">
          <div className="login-heading">Please Login With a Valid Credential</div>
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
            onClick={attemptLogin}
          >
            Login
          </button>
          <div className="login-footer">
            <p>Don't have an account? <a href="#">Sign up</a></p>
          </div>
        </div>
      );

    function attemptLogin(){
        console.log(userId);
        console.log(password);

        const client = new Client();
        const loginPromise = client.login(userId, password);
        loginPromise
        .then((res) => {         
            console.log(res);
            console.log("Navigating to questionsfeed");
            client.setupAuthHeader(userId, password);

            //save credentials to localStorage
            storeCredential()
            
            //reset the input fields
            setuserId("")
            setPassword("")

            //succesful login will route to questions page
            navigate("/questions");
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