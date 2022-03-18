import { Component } from "react/cjs/react.production.min";
import './Question.css'
import QuestionActionsComponent from "./QuestionActionsComponent";
import QuestionBodyComponent from "./QuestionBodyComponent";

export default class QuestionComponent extends Component{
    render(){
        return(
            <div className="card">
                <QuestionBodyComponent question={this.props.question}/>
                <QuestionActionsComponent question={this.props.question}/>
            </div>
        )
    }
}