import { Component } from "react/cjs/react.production.min";
import HeapOverFlowService from "../../api/heapoverflow/HeapOverFlowService";
import './Question.css'
import QuestionActionsComponent from "./QuestionActionsComponent";
import QuestionBodyComponent from "./QuestionBodyComponent";
import VoteComponent from "./vote/VoteComponent";

export default class QuestionComponent extends Component{   
    
    render(){
        return(
            <div>
                <div className="card_orig">
                    <div style={{display: "inline"}}>
                    <VoteComponent myVote={this.props.myVote} votes={this.props.question.votes} voteCallback={this.voteCallback}/>
                    <QuestionBodyComponent question={this.props.question}/>
                    </div>
                    <div>
                    <QuestionActionsComponent question={this.props.question} questionUpdated={this.onQuestionUpdated}/>
                    </div>
                </div>
            </div>
        )
    }   

    onQuestionUpdated = () =>{
        //after updating questions (deletion/votes), refresh the page
        this.props.questionUpdated();
    }

    voteCallback = async (myVote) =>{
        const response = await new HeapOverFlowService().postVotes(this.props.question.id, myVote);
        console.log("Vote Changed for Question:");
        console.log(response.data.question);

        //after updating votes, refresh the page
        this.onQuestionUpdated();
    }
}