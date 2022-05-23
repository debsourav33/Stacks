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
                    <div>
                    <VoteComponent questionId={this.props.question.id}/>
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
}