import React, { Component } from "react";
import {Button,Dropdown,ButtonGroup} from 'react-bootstrap';

import '../shared/login'
import '../../common.css'
import HeapOverFlowService from "../../api/heapoverflow/HeapOverFlowService";
import QuestionComponent from "./QuestionComponent";
import "./QuestionFeed.css"
import Question from "./models/Question";

class QuestionFeedComponent extends Component{
    sortBy = "votesDesc";

    constructor(props){
        super(props);
        this.state = {questions:[]};
        this.fetchQuestionsSortedByVotesDesc = this.fetchQuestionsSortedByVotesDesc.bind(this);
        this.fetchQuestionsSortedByVotesAsc = this.fetchQuestionsSortedByVotesAsc.bind(this);
        this.handleQeustionResponse = this.handleQuestionResponse.bind(this);
        this.onSortByVote = this.onSortByVote.bind(this);
    }

    componentDidMount(){
        this.fetchQuestionsSortedByVotesDesc();
    }

    render(){
        return(
            <div className="question-feed">
                <Dropdown as={ButtonGroup}>
                    <Button variant="primary" onClick={this.onSortByVote}>Sort</Button>

                    <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

                    <Dropdown.Menu>
                        <Dropdown.Item as="button">By Vote</Dropdown.Item>
                        <Dropdown.Item as="button">By Time</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
                {this.questionsToHtmlListItems(this.state.questions)}
            </div>
        );
    }

    onSortByVote(){
        if(this.sortBy === "votesDesc"){
            this.fetchQuestionsSortedByVotesAsc();
            this.sortBy = "votesAsc";
        }
        else if(this.sortBy === "votesAsc"){
            this.fetchQuestionsSortedByVotesDesc();
            this.sortBy = "votesDesc";
        }
    }

    async fetchQuestionsSortedByVotesDesc(){      
        try{
            //using await here will block the execution until the promise is resolved or rejected (catch error)
            let response = await new HeapOverFlowService().retrieveAllQuestionsSortedByVotesDesc();
            this.handleQuestionResponse(response);
        }
        catch(error){
            console.log(error)
        };
    }

    async fetchQuestionsSortedByVotesAsc(){      
        try{
            //using await here will block the execution until the promise is resolved or rejected (catch error)
            let response = await new HeapOverFlowService().retrieveAllQuestionsSortedByVotesAsc();
            this.handleQuestionResponse(response);
        }
        catch(error){
            console.log(error)
        };
    }

    async handleQuestionResponse(response){        
        try{
            console.log(response.data?.questions);
            let questionList = response.data?.questions?.map(question => {
                return new Question(question.id, question.title, question.description, question.userName, question.votes);                
            });

            console.log("Mapped Question From Response");
            console.log(questionList);
            this.setState({questions: questionList});
        }
        catch(error){
            console.log(error)
        };
    }

    questionsToHtmlListItems(questions){
        let ret = [];
        for(let i=0;i<questions?.length;i++){
            let question = questions?.[i];
            if(!question) continue;

            //ret.push(<li key={question.id} className="list-group-item"> <QuestionComponent question={question}>/></li>);
            ret.push(<QuestionComponent key={question.id} question={question} questionUpdated={()=>{
                console.log("Re-rendering Question Feed");
            }}/>);
        }
        return ret;
    }
}

export default QuestionFeedComponent;