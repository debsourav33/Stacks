const HttpError = require("../models/HttpError");
const QuestionRepository = require("../repository/QuestionRepository");
const Question = require ("../models/Question");
const UserActivityRepository = require("../repository/UserActivityRepository");

class VotesController{
    questionRepository = new QuestionRepository();
    userActivityRepository = new UserActivityRepository();

    constructor(){
        this.postVotesToQuestion = this.postVotesToQuestion.bind(this);
        this.getVotesCount = this.getVotesCount.bind(this);
    }

    getVotesCount(req,res,next){
        const qid = parseInt(req.params.qid);
        const votes = this.questionRepository.getVotesById(qid);
        res.json({questionId: qid, votes});
    }

    postVotesToQuestion(req,res,next){
        const qid = parseInt(req.params.qid);

        const {votes, user} = req.body;

        console.log(`Add ${votes} votes by ${user} for question: ${qid}`);
        
        /*
        const question = this?.questionRepository?.getDummyQuestionById(qid);
        if(!question){
            console.log("not found");
            return next(new HttpError("No question found with the given ID", 404));
        }
        console.log(question);
        question.votes += votes; //FIX : Problematic?
        */

        //Important: Calculate vote changes first and then store new vote activity
        const voteChanges = this.#calculateVoteChanges(user,qid,votes);
        this.questionRepository.addVotesToQuestion(qid,voteChanges);
        
        this.userActivityRepository.storeVoteActivity(user,qid,votes);
        res.json({question: this?.questionRepository?.getDummyQuestionById(qid)});
    }

    #calculateVoteChanges = (user,qid,newVoteStatus) => {
        const oldVoteStatus = this.userActivityRepository.getVoteStatus(user,qid);
        const voteChanges= newVoteStatus - oldVoteStatus;
        console.log(`Old voteStatus: ${oldVoteStatus}, New VoteStatus: ${newVoteStatus}, voteChanges: ${voteChanges}`);

        return voteChanges;
    }

}

module.exports = VotesController;