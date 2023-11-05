import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";

export default class LogoutComponent extends Component{
    render(){
        this.attemptLogout();
        return(
            <>
                <h1>You are Succesfully Logged Out</h1>
                <div className="container"> Thank you for using our website</div>
            </>
        );
    }

    attemptLogout(){
        AuthenticationService.unregisterLogin();
    }
}