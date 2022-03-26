class Comment{
    constructor(questionId, commentId, text, userName){
        this.questionId = typeof questionId == String ? questionId : questionId.toString();
        this.commentId = commentId;
        this.text = text;
        this.userName = userName;
    }
}

module.exports = Comment