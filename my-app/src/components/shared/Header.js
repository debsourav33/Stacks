import React, { Component } from "react";
import { Link} from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

class HeaderComponent extends Component{
    render(){
        const loggedIn = AuthenticationService.isLoggedIn();

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <ul className="navbar-nav">
                        {
                            loggedIn &&
                        <li>
                            <Link className="nav-link" to="/welcome">Home</Link> 
                        </li>
                        }
                        {
                            loggedIn &&
                        <li>
                            <Link className="nav-link" to="/todo">Todo</Link> 
                        </li>
                        }
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {  !loggedIn &&
                        <li>
                            <Link className="nav-link" to="/login">Login</Link> 
                        </li>
                        }
                        {
                            loggedIn &&
                        <li>
                            <Link className="nav-link" to="/logout">Logout</Link> 
                        </li>
                        }
                    </ul>
                </nav>

            </header>
        )
    }
}

export default HeaderComponent;