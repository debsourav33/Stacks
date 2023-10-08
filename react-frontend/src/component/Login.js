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

    return(
        <div className="middle">
            <div> Please Login With a Valid Credential</div>
            <div>
                <input type="text" name ="userId" onChange={onUserIdChange}/>
                <label htmlFor="userId">User ID</label>
            </div>
            <div>
                <input type="password" name ="password" onChange={onPasswordChange}/>
                <label htmlFor="password">Password</label>
            </div>
            <button type="submit" className="btn btn-success" style={{margin: '10px'}} onClick={attemptLogin}>Login</button>
            
        </div>
    )

    function attemptLogin(){
        console.log(userId);
        console.log(password);

        const client = new Client();
        const loginPromise = client.login(userId, password);
        loginPromise
        .then((res) => {            
            console.log(res);
            console.log("Navigating to questionsfeed");
            client.setupAuthenticationHeader(userId, password);
            navigate("/questions");
        })
        .catch((err) => console.log(`Failed! ${err}`));
    }
    
}