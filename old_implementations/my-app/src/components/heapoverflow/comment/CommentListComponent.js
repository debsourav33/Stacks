import { useParams } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import HeapOverFlowService from "../../../api/heapoverflow/HeapOverFlowService";
import Comment from "../models/Comment";
import Question from "../models/Question";
import QuestionBodyComponent from "../QuestionBodyComponent";
import CommentComponent from "./CommentComponent";
import CommentPostComponent from "./CommentPostComponent"

class CommentListClassComponent extends Component{
    constructor(props){
        super(props);
        this.state = {question:undefined, comments: []};
        this.onCommentPostedCallback = this.onCommentPostedCallback.bind(this);
    }

    async componentDidMount(){
        console.log(`Comments page for: ${this.props.params.qid}`);
        this.retrieveQuestionFromBackend(this.props.params.qid);
        this.retrieveCommentsFromBackend(this.props.params.qid);
    }

    render(){
        return (
            <>
                <div className="card_orig">
                <QuestionBodyComponent question = {this.state.question}/>
                </div>
                <CommentPostComponent questionId = {this.state.question?.id} onCommentPostedCallback = { () => {this.onCommentPostedCallback(this.state.question?.id)}}/>;
                
                {this.commentsToHtmlListItems(this.state.comments)};
            </>
        );
    }

    async onCommentPostedCallback(qid){
        console.log("Comment Posted Callback Triggered");
        this.retrieveCommentsFromBackend(qid);
    }

    async retrieveQuestionFromBackend(qid){
        const webService = new HeapOverFlowService();
        const response = await webService.getQuestion(qid);

        //if(!response?.data?.question)  return;
        const {id,title,description,userName} = response.data?.question;
        this.setState({question: new Question(id,title,description,userName)});
    }

    async retrieveCommentsFromBackend(qid){
        const webService = new HeapOverFlowService();
        const response = await webService.getCommentsByQuestionId(qid);

        //if(!response?.data?.question)  return;
        const commentResponses = response.data?.comments;
        console.log("Received Comments:");
        console.log(commentResponses);

        const comments = commentResponses.map(comment => {
            return new Comment(comment.questionId, comment.commentId, comment.text, comment.userName);
        });
        this.setState({comments});
    }

    commentsToHtmlListItems(comments){
        let ret = [];
        for(let i=0;i<comments?.length;i++){
            let comment = comments?.[i];
            if(!comment || !comment.commentId || !comment.questionId || !comment.text || !comment.userName){
                continue;
            }
            //ret.push(<li key={question.id} className="list-group-item"> <QuestionComponent question={question}>/></li>);
            ret.push(<CommentComponent key={comment.commentId} comment ={comment}/>);
        }
        return ret;
    }
}

export default function CommentListComponent(props){
    const params = useParams();
    return <CommentListClassComponent {...props} params = {params}/>;
}