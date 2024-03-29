import React, { Component } from "react";
import HeapOverFlowService from "../../api/heapoverflow/HeapOverFlowService";
import AuthenticationService from "./AuthenticationService";
import {useNavigate} from "react-router-dom";
import "./login.css"

import {connect} from 'react-redux';
import { registerSuccesfulLogin } from "../../js_module/redux";

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

    componentDidMount(){
        setTimeout(() => {console.log(this.props); this.props.registerUser("Souvik");}
        , 3000);
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.user && (!this.props.user || this.props.user !== nextProps.user);
    }

    render(){
        return(
            <div className="login">
                <div> Please Login With a Valid Credential or {this.props.user} </div>
                <div>
                UserName <input type="text" name ={this.#userNameAttr} onChange={this.onInputChange}/>
                Password <input type="password" name ={this.#passwordAttr} onChange={this.onInputChange}/>
                <button type="submit" className="btn btn-success" style={{margin: '10px'}} onClick={this.attemptLogin}>Login</button>
                </div>
                
            </div>
        )
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
}

//export default LoginComponent;

function LoginComponent(props) {
    const navigation = useNavigate();
  
    return <LoginClassComponnent {...props} navigate={navigation} />;
}

const mapStateToProps = (state) => {
    return {user: state.username};
}

const mapDispatchToProps = (dispatch) => {
    return {registerUser: (userName) => dispatch(registerSuccesfulLogin(userName,"***"))};
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent);