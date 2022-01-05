import React, { Component } from "react";
import '../shared/login'
import '../../common.css'
import HeapOverFlowService from "../../api/heapoverflow/HeapOverFlowService";
import QuestionComponent from "./QuestionComponent";
import "./Question.css"

class QuestionFeedComponent extends Component{
    constructor(props){
        super(props);
        this.state = {questions:[]};
        this.retrieveMessageFromBackend = this.retrieveMessageFromBackend.bind(this);
    }

    componentDidMount(){
        this.retrieveMessageFromBackend();
    }

    render(){
        return(
            <div className="question-feed">
                <button className="btn btn-success" onClick={this.retrieveMessageFromBackend}>Poke Backend</button>
                
                {this.questionsToHtmlListItems(this.state.questions)}
            </div>
        );
    }

    retrieveMessageFromBackend(){
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

    questionsToHtmlListItems(questions){
        let ret = [];
        for(let i=0;i<questions.length;i++){
            let question = questions[i];
            //ret.push(<li key={question.id} className="list-group-item"> <QuestionComponent question={question}>/></li>);
            ret.push(<QuestionComponent question={question} questionUpdated={()=>{
                console.log("Re-rendering Question Feed");
                this.retrieveMessageFromBackend();
            }}/>);
        }
        return ret;
    }
}

export default QuestionFeedComponent;