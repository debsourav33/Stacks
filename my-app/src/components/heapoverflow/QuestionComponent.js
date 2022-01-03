import { Component } from "react/cjs/react.production.min";
import './Question.css'

export default class QuestionComponent extends Component{
    render(){
        return(
            <div className="card">
                <h4>{this.props.question.title}</h4>
                {this.props.question.description}
            </div>
        )
            
        
    }
}