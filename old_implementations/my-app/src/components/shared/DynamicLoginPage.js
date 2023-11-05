import React, { Component } from "react";
import LoginComponent from "./login";
import "./login.css";

export default class DynamicLoginPage extends Component{
    render(){
        return(
            <div className ="slidingBody">
                <div className="container">
                    <div className="card">

                        <div className="slide slide1">

                            <div className="content">

                                <div className="icon">

                                    <i className="fa fa-user-circle" aria-hidden="true"></i>

                                </div>

                            </div>

                        </div>

                        <div className="slide slide2">

                            <div className="content">
                                <LoginComponent/>
                            </div>
                        </div>
                    </div>       
                </div>
            </div>
        )
    }
}