import { Component } from "react/cjs/react.production.min";
import HeapOverFlowService from "../../api/heapoverflow/HeapOverFlowService";
import './Question.css'

export default class QuestionComponent extends Component{
    constructor(props){
        super(props);
        this.onQuestionDeleteCalled = this.onQuestionDeleteCalled.bind(this);
    }

    render(){
        return(
            <div className="card">
                <h4>{this.props.question.title}</h4>
                {this.props.question.description}
                <button className="btn btn-warning btn-sized" onClick={() => this.onQuestionDeleteCalled(this.props.question)}>Delete</button>
            </div>
        )
    }

    onQuestionDeleteCalled(question){
        console.log(`Deleting Question:`)
        console.log(question)
        let promise = new HeapOverFlowService().deleteQuestion(question.id)
        promise.then(resolve => {
            this.props.questionUpdated();                        
        });
    }
}