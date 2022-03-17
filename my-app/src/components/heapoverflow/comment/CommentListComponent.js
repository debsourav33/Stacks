import { useParams } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import CommentComponent from "./CommentComponent";

class CommentListClassComponent extends Component{
    constructor(props){
        super(props);
        this.state = {comments: [
            {
                cid: 1,
                userName: "deb33",
                text: "This post is hilarious!"

            },
            {
                cid: 2,
                userName: "noneOps",
                text: "Restart your router"

            }

        ]}
    }

    componentDidMount(){
        console.log(`Comments page for: ${this.props.params.qid}`);
        this.retrieveCommentsFromBackend(this.props.params.qid);
    }

    retrieveCommentsFromBackend(){

    }
    
    render(){
        return (
            <div>
                {this.commentsToHtmlListItems(this.state.comments)};
            </div>
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