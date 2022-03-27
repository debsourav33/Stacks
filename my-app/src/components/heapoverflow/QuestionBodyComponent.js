import { Component } from "react/cjs/react.production.min";
import './Question.css'

export default class QuestionBodyComponent extends Component{
    render(){
        {
            /*
                <div className="body">
                    <div class="container">
                        <div class="card">
                            <div class="card__body">
                                <span class="tag tag-blue">Technology</span>
                                <h4>{this.props.question?.title}</h4>
                                <p>{this.props.question?.description}</p>
                            </div>
                            <div class="card__footer">
                                <div class="user">
                                    <div class="user__info">
                                        <h5>{this.props.question?.userName}</h5>
                                        <small>2h ago</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            */    
            }
        return(
            <>
                <h4>{this.props.question?.title}</h4>
                {this.props.question?.description}
            </>           
        );
    }
}

