import React, { Component } from "react";

export default class CommentComponent extends Component{

    render(){
        return(
            <div className="card">
                <b> {this.props.comment.userName} </b>
                {this.props.comment.text}                
            </div>
        );
    }
}