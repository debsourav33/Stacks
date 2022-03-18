import { Component } from "react/cjs/react.production.min";
import './Question.css'

export default class QuestionBodyComponent extends Component{
    render(){
        return(
            <>
                <h4>{this.props.question?.title}</h4>
                {this.props.question?.description}
            </>
        )
    }
}