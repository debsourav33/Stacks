import React, { Component } from "react";
import HeapOverFlowService from "../../api/heapoverflow/HeapOverFlowService";
import AuthenticationService from "./AuthenticationService";
import {useNavigate} from "react-router-dom";

class LoginClassComponnent extends Component{
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

    shouldComponentUpdate(nextProps, nextState){
        return false;
    }

    onInputChange(event) {
        this.setState({
            [event.target.name] : event.target.value //[username] : asd , [password]: 123
        });
    }

    attemptLogin(){
        //if(this.#userDict[this.state.username] = this.state.password){

        let result = new HeapOverFlowService().authenticate(this.state[this.#userNameAttr], this.state[this.#passwordAttr]);
        let promise = result[0];
        let callback = result[1];
        promise.then(response => {
            console.log("Login Succesful");
            console.log(response)
            
            AuthenticationService.registerSuccesfulLogin(this.state[this.#userNameAttr], this.state[this.#passwordAttr]);
            callback()
            
            //console.log(this.props.history);            
            this.props.navigate("/questions");
        }).catch(error => {
            console.log("Wrong UserName/Password");
            console.log(error);
        });
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

//export default LoginComponent;

export default function LoginComponent(props) {
    const navigation = useNavigate();
  
    return <LoginClassComponnent {...props} navigate={navigation} />;
}