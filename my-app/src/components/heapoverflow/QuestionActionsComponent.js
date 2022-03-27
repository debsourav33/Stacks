import { useNavigate } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import HeapOverFlowService from "../../api/heapoverflow/HeapOverFlowService";
import CommentListClassComponent from "./comment/CommentListComponent";
import './Question.css'

class QuestionActionsClassComponent extends Component{
    constructor(props){
        super(props);
        this.onQuestionDeleteClicked = this.onQuestionDeleteClicked.bind(this);
        this.onViewCommentsCalled = this.onViewCommentsCalled.bind(this);
    }

    render(){
        return(
            <div style={{display: "inline-block"}}>
            <button className="btn btn-warning btn-sized" style = {{marginRight: "5px"}} onClick={() => this.onQuestionDeleteClicked(this.props.question)}>Delete</button>
            <button className="btn btn-success" onClick={() => this.onViewCommentsCalled(this.props.question)}>Comment</button>
            </div>
        )
    }

    onQuestionDeleteClicked(question){
        console.log(`Deleting Question:`)
        console.log(question)
        let promise = new HeapOverFlowService().deleteQuestion(question.id)
        promise.then(resolve => {
            this.props.questionUpdated();                        
        });
    }

    onViewCommentsCalled(question){
        this.props.navigate(`${question.id}`,{question});
    }
}

export default function QuestionActionsComponent(props) {
    const navigation = useNavigate();
    return <QuestionActionsClassComponent {...props} navigate = {navigation}/>;
}