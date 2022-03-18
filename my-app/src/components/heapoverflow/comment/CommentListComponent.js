import { useParams } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import HeapOverFlowService from "../../../api/heapoverflow/HeapOverFlowService";
import Comment from "../models/Comment";
import Question from "../models/Question";
import QuestionBodyComponent from "../QuestionBodyComponent";
import CommentComponent from "./CommentComponent";

class CommentListClassComponent extends Component{
    constructor(props){
        super(props);
        this.state = {comments: []};
    }

    async componentDidMount(){
        console.log(`Comments page for: ${this.props.params.qid}`);
        this.retrieveQuestionFromBackend(this.props.params.qid);
        this.retrieveCommentsFromBackend(this.props.params.qid);
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
    
    render(){
        return (
            <>
                <div className="card">
                <QuestionBodyComponent question = {this.state.question}/>
                </div>
                {this.commentsToHtmlListItems(this.state.comments)};
            </>
        );
    }

    commentsToHtmlListItems(comments){
        let ret = [];
        for(let i=0;i<comments?.length;i++){
            let comment = comments?.[i];
            if(!comment) continue;
            //ret.push(<li key={question.id} className="list-group-item"> <QuestionComponent question={question}>/></li>);
            ret.push(<CommentComponent key={comment.cid} comment ={comment}/>);
        }
        return ret;
    }
}

export default function CommentListComponent(props){
    const params = useParams();
    return <CommentListClassComponent {...props} params = {params}/>  ;
   ;
}