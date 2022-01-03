import React, { Component } from "react";
import '../shared/login'
import '../../common.css'
import TodoDataService from "../../api/todo/TodoDataService"
import AuthenticationService from "../shared/AuthenticationService"
import HeapOverFlowService from "../../api/heapoverflow/HeapOverFlowService";
import QuestionComponent from "./QuestionComponent";

class QuestionFeedComponent extends Component{
    constructor(props){
        super(props);
        this.state = {questions:[]};
    }

    componentDidMount(){
        let promise = new HeapOverFlowService().retrieveAllQuestions();
        promise.then(response =>{
            let questionList = response.data.map(question => {
                //console.log(todo);
                return {id: question.id, title: question.title, description: question.description};                
            });
            console.log("Mapped Question From Response");
            this.setState({questions: questionList});
            console.log(this.state);
        });
    }

    render(){
        return(
            <div className="todo">
                <button className="btn btn-warning" onClick={this.retrieveMessageFromBackend}>Poke Backend</button>
                {/*
                <ul className="list-group">
                    {this.questionsToHtmlListItems(this.state.questions)}
                </ul> */
                }

                {this.questionsToHtmlListItems(this.state.questions)}
            </div>
        );
    }

    retrieveMessageFromBackend(){
        //let promise = new HelloWorldService().executeHelloWorldPathVariableService("Ana");
        let promise = new HeapOverFlowService().retrieveAllQuestions();
        promise.then(response => console.log(response.data))
        .catch(error => console.log(error));
        console.log("**Retrieve Message From Backend**");
    }

    questionsToHtmlListItems(questions){
        let ret = [];
        for(let i=0;i<questions.length;i++){
            let question = questions[i];
            //ret.push(<li key={question.id} className="list-group-item"> <QuestionComponent question={question}>/></li>);
            ret.push(<QuestionComponent question={question}/>);
        }
        //console.log(ret);
        return ret;
    }
}

export default QuestionFeedComponent;