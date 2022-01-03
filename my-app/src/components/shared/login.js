import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

class LoginComponent extends Component{
    #userNameAttr = 'username'
    #passwordAttr = 'password'
    #userDict = {}


    constructor(props){
        super(props);
        this.state = {[this.#userNameAttr]:'', [this.#passwordAttr]:''};
        this.onInputChange = this.onInputChange.bind(this);
        this.attemptLogin = this.attemptLogin.bind(this);

        this.#userDict["deb33"] = "admin123";
    }

    onInputChange(event) {
        this.setState({
            [event.target.name] : event.target.value //[username] : asd , [password]: 123
        });
        console.log(this.state);
    }

    attemptLogin(){
        //if(this.#userDict[this.state.username] = this.state.password){

        if(this.state.username === "d" && this.state.password==="d"){
            console.log("Login Succesful");
            AuthenticationService.registerSuccesfulLogin(this.state.username, this.state.password);
            
            console.log(this.props.history);            
            //this.props.history.push('/welcome');
        }
        else{
            console.log("Wrong UserName/Password");
        }
    }

    render(){
        return(
            <div className="login">
                <div> Please Login With a Valid Credential </div>
                <div>
                UserName <input type="text" name ={this.#userNameAttr} onChange={this.onInputChange}/>
                Password <input type="password" name ={this.#passwordAttr} onChange={this.onInputChange}/>
                <button type="submit" className="btn btn-success" style={{margin: '10px'}} onClick={this.attemptLogin}>Login</button>
                </div>
                
            </div>
        )
    }    
}

export default LoginComponent;