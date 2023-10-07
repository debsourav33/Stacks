import React, { Component, useState } from "react";
import QuestionsClient from "../api-client/QuestionsClient.js";
import "./login.css"
import {useNavigate} from "react-router-dom"

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
        <div className="login">
            <div> Please Login With a Valid Credential</div>
            <div>
            userId <input type="text" name ="User ID" onChange={onUserIdChange}/>
            Password <input type="password" name ="Password" onChange={onPasswordChange}/>
            <button type="submit" className="btn btn-success" style={{margin: '10px'}} onClick={attemptLogin}>Login</button>
            </div>
            
        </div>
    )

    function attemptLogin(){
        console.log(userId);
        console.log(password);

        const loginPromise = new QuestionsClient().login(userId, password);
        loginPromise
        .then((res) => {            
            console.log(res);
            console.log("Navigating to questionsfeed");
            navigate("/questions");
        })
        .catch((err) => console.log(`Failed! ${err}`));
    }
    
}