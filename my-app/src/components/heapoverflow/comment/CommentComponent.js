import React, { Component } from "react";

import "../Question.css";

export default class CommentComponent extends Component{

    render(){
        return(
            <div className="card_orig">
                <b> {this.props.comment.userName} </b>
                {this.props.comment.text}                
            </div>
        );
    }
}