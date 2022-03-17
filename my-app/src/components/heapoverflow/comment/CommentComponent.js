import React, { Component } from "react";

export default class CommentComponent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="card">
                <b> {this.props.comment.userName} </b>
                {this.props.comment.text}                
            </div>
        );
    }
}