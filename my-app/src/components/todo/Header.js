import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HeaderComponent extends Component{
    render(){
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <ul className="navbar-nav">
                        <li>
                            <Link className="nav-link" to="/welcome">Home</Link> 
                        </li>
                        <li>
                            <Link className="nav-link" to="/todo">Todo</Link> 
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li>
                            <Link className="nav-link" to="/login">Login</Link> 
                        </li>
                        <li>
                            <Link className="nav-link" to="/logout">Logout</Link> 
                        </li>
                    </ul>
                </nav>

            </header>
        )
    }
}