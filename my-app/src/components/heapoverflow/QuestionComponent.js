import { useNavigate } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import HeapOverFlowService from "../../api/heapoverflow/HeapOverFlowService";
import CommentListClassComponent from "./comment/CommentListComponent";
import './Question.css'

class QuestionClassComponent extends Component{
    constructor(props){
        super(props);
        this.onQuestionDeleteClicked = this.onQuestionDeleteClicked.bind(this);
        this.onViewCommentsCalled = this.onViewCommentsCalled.bind(this);
    }

    render(){
        return(
            <div className="card">
                <h4>{this.props.question.title}</h4>
                {this.props.question.description}
                
                <div style={{display: "inline"}}>
                <button className="btn btn-warning btn-sized" style = {{marginRight: "5px"}} onClick={() => this.onQuestionDeleteClicked(this.props.question)}>Delete</button>
                <button className="btn btn-success" onClick={() => this.onViewCommentsCalled(this.props.question)}>Comment</button>
                </div>
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

export default function QuestionComponent(props) {
    const navigation = useNavigate();
    return <QuestionClassComponent {...props} navigate = {navigation}/>;
}