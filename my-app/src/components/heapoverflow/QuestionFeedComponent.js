import React, { Component } from "react";
import '../shared/login'
import '../../common.css'
import HeapOverFlowService from "../../api/heapoverflow/HeapOverFlowService";
import QuestionComponent from "./QuestionComponent";
import "./QuestionFeed.css"
import Question from "./models/Question";

class QuestionFeedComponent extends Component{
    constructor(props){
        super(props);
        this.state = {questions:[], qidVoteMap: {}};
        this.retrieveQuestionsFromBackend = this.retrieveQuestionsFromBackend.bind(this);
    }

    componentDidMount(){
        this.retrieveQuestionsFromBackend();
    }

    render(){
        return(
            <div className="question-feed">
                <button className="btn btn-success" onClick={this.retrieveQuestionsFromBackend}>Poke Backend</button>
                
                {this.questionsToHtmlListItems(this.state.questions)}
            </div>
        );
    }

    async retrieveQuestionsFromBackend(){        
        //promise.then(response =>{

        try{
            //using await here will block the execution until the promise is resolved or rejected (catch error)
            let response = await new HeapOverFlowService().retrieveAllQuestions();
            console.log(response.data?.questions);
            let questionList = response.data?.questions?.map(question => {
                return new Question(question.id, question.title, question.description, question.userName, question.votes);                
            });

            this.retrieveMyVotesForQuestions(questionList);

            console.log("Mapped Question From Response");
            this.setState({questions: questionList});
            console.log(this.state);
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

            const myVote = this.state.qidVoteMap[question.id];

            //ret.push(<li key={question.id} className="list-group-item"> <QuestionComponent question={question}>/></li>);
            ret.push(<QuestionComponent key={question.id} question={question} myVote={myVote} questionUpdated={()=>{
                console.log("Re-rendering Question Feed");
                this.retrieveQuestionsFromBackend();
            }}/>);
        }
        return ret;
    }

    async retrieveMyVotesForQuestions(questions){
        for(const question of questions){
            const qid = question.id;
            try{
                const response = await new HeapOverFlowService().getMyVoteStatus(qid);
                const myVote = response?.data?.vote;
                console.log(`My vote is ${myVote} on question ${qid}`);
                
                this.setState(prevState => ({ //FIND: why a parentheses needed here?
                    qidVoteMap : {
                        ...prevState.qidVoteMap, //keep all previous key-value pairs
                        [qid] : myVote //add the new key-value pair
                    }
                }));
            }
            catch(e){
                console.log(e);
                this.qidVoteMap[qid] = 0;
            }
        }
    }
}

export default QuestionFeedComponent;