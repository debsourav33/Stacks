import React, { Component } from "react";
import HeapOverFlowService from "../../../api/heapoverflow/HeapOverFlowService";
import AuthenticationService from "../../shared/AuthenticationService";
import Comment from "../models/Comment";

class CommentPostComponent extends Component{
    #textAttr = 'text'

    constructor(props){
        super(props);
        this.state = {[this.#textAttr]:''};
        this.onInputChange = this.onInputChange.bind(this);
        this.postComment = this.postComment.bind(this);
        this.commentTextRef = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState){
        return false;
    }

    render(){
        return(
            <>
                <div>
                <textarea style={{width: "100vh"}} type="textArea" ref={this.commentTextRef} placeholder="Your Answer..." name ={this.#textAttr} onChange={this.onInputChange}/>
                </div>
                <div>
                <button type="submit" className="btn btn-warning" style={{margin: '10px'}} onClick={this.postComment}>Post Answer</button>
                </div>
            </>
        )
    }    

    onInputChange(event) {
        this.setState({
            [event.target.name] : event.target.value //[username] : asd , [password]: 123
        });
    }

    async postComment(){
        this.commentTextRef.current.value = "";
        const userName = AuthenticationService.getLoggedInUserName();
        
        const comment = new Comment(this.props.questionId, undefined, this.state[this.#textAttr], userName);
        console.log(`Comment to post:`);
        console.log(comment);
        try{
            const response = await new HeapOverFlowService().postComment(this.props.questionId, comment);
            console.log("Succesfully posted comment");
            console.log(response);
            this.props.onCommentPostedCallback();
        }
        catch(error){
            console.log("Error in posting question");
            console.log(error);
        }
    }
}

export default CommentPostComponent;