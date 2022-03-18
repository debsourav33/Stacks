class Comment{
    constructor(questionId, commentId, text, userName){
        this.questionId = questionId;
        this.commentId = commentId;
        this.text = text;
        this.userName = userName;
    }
}

module.exports = Comment