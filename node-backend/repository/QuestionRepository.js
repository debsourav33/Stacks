const Question = require("../models/Question");

class QuestionRepository{
    static instance = undefined;

    constructor(){
        if(QuestionRepository.instance){
            return QuestionRepository.instance;
        }

        this.dummyQuestions = [
            new Question(1, "Do it?","Should I do it?", "deb33", 4),
            new Question(2, "Hash or Trie?", "The question is real", "no-one", 12)
        ];

        QuestionRepository.instance = this;
    }

    getDummyQuestions = ()=>{
        return this.dummyQuestions;
    }

    getDummyQuestionById = (qid) => {
        if(typeof qid === 'string')  qid = parseInt(qid);

        return this.dummyQuestions.find( q => {
            return q.id === qid;
        });
    }

    getAllQuestions = async () => {
        return this.dummyQuestions;

        try{
            const questions = await new StackOverFlowService().getQuestions();
            const items = questions?.data?.items;

            if(!items){
                return this.dummyQuestions;
            }

            const questionsList = [];
            let count = 0;

            for(const item of items){
                const title = item?.title;
                const owner = item?.owner?.display_name;

                questionsList.push(new Question(++count,title,"",owner));
            }

            //res.json({questions: this.dummyQuestions});
            return questionsList;
        }
        catch(e){
            //console.log(e);
            //return next(new HttpError("Can't fetch questions from StackExchange",500));
            return this.dummyQuestions;
        }
    }

    saveQuestion = (question) => {
        this.dummyQuestions.push(question);
    }

    deleteQuestion = (qid) => {
        this.dummyQuestions = this.dummyQuestions.filter(q => q.id !== qid);
    }

    addVotesToQuestion = (qid,voteChanges) => {
        if(typeof qid === 'string')  qid = parseInt(qid);
        this.dummyQuestions = this.dummyQuestions.map( q => {
            if(qid===q.id){
                console.log(`Question ${qid} found`);
                console.log(`Adding ${voteChanges} to ${q.votes} votes`);
                q.votes += voteChanges;
            }

            return q;
        });
    }
}

module.exports = QuestionRepository;