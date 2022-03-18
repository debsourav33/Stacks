const {v4:uuidv4} = require('uuid');

const Comment = require("../models/Comment");
const HttpError = require('../models/HttpError');

class CommentsController{
    comments = [
        new Comment(1,uuidv4(),"You have to restart the router manully", "mrFixYourIT"),
        new Comment(1,uuidv4(),"Cat walk please...", "unknownx33"),
    ];
    
    addComment = (req,res,next) => {
        try{
            const {questionId,text,userName} = req.body;
            const comment = new Comment(questionId,uuidv4(),text,userName);
            console.log("Comment to add:");
            console.log(comment);

            this.comments.push(comment);
            res.status(200).json({comment});
        }
        catch(e){
            console.log(e);
            throw e;
        }
    }

    getComments = (req,res,next) => {
        let filteredComments;
        if(req.body?.questionId){
            console.log(`Request for comments with questionId: ${req.body.questionId}`);
            filteredComments = this.#getCommentsByQuestionId(req.body.questionId);
        }
        else if(req.body?.commentIds){
            console.log(`Request for comments with commentIds:`);
            console.log(req.body.commentIds);
            filteredComments = this.#getCommentsByCommentIds(req.body.commentIds.map(obj =>{
                return obj.commentId;
            }));
        }
        else{
            return new HttpError("Wrong Payload: Expected questionId/commentIds", 404);
        }

        res.status(200).json({comments: filteredComments});
    }

    #getCommentsByCommentIds = (ids) => {
        console.log(ids);
        let filteredComments =  this.comments.filter( comment => {
            return ids.includes(comment.commentId);
        });

        return filteredComments;
    }

     #getCommentsByQuestionId = (id) => {
        let filteredComments =  this.comments.filter( comment => {
            return id === comment.questionId;
        });

        return filteredComments;
    }
}


module.exports = CommentsController;