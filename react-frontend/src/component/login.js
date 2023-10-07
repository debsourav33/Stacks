import React, { Component } from "react";
import QuestionsClient from "../api-client/questionsClient.js";
import "./login.css"

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
        const questionClient = new QuestionsClient()
        const questionPromise = questionClient.getAllQuestions();

        questionPromise
        .then((res) => {    console.log(res.data) })
        .catch((err) => console.log(err) );
    }

    shouldComponentUpdate(nextProps, nextState){
        //return nextProps.user && (!this.props.user || this.props.user !== nextProps.user);
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
    
    }
}

//export default LoginComponent;

function LoginComponent(props) {
  
    return <LoginClassComponnent {...props} />;
}

export default (LoginComponent);