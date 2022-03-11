const HttpError = require('../models/HttpError');
const Question = require('../models/Question');
class QuestionController{
    constructor(){
        this.dummyQuestions = [
            new Question(1, "Do it?","Should I do it?", "deb33")
            ,
            new Question(2, "Hash or Trie?", "The question is real", "no-one")
        ];

        this.getAllQuestions = this.getAllQuestions.bind(this);
        this.getQuestionByQuestionId = this.getQuestionByQuestionId.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }

    getAllQuestions(req,res,next){
        res.json({questions: this.dummyQuestions});
    }

    getQuestionByQuestionId(req,res,next){
        const qid = parseInt(req.params.qid); // {qid: '1'}
        console.log('Get request for question: ');
        const question = this.dummyQuestions.find( q => {
            return q.id === qid;
        });
    
        if(!question){
            return next(new HttpError("Can't find question with the requested id!"));
        }
    
        res.json({question});
    }

    saveQuestion(req,res,next){
        const {title,description,userName} = req.body;
        //title = req.body.title
        //desc = req.body.desc

        const createdQuestion = new Question(3, title, description, userName);
        console.log(createdQuestion);

        this.dummyQuestions.push(createdQuestion);
        res.status(201).json({question: createdQuestion});
    }

    deleteQuestion(req,res,next){
        const qid = parseInt(req.params.qid);
        this.dummyQuestions = this.dummyQuestions.filter(q => q.id !== qid);
        res.status(200).json({message: `Question Deleted with id: ${qid}`});
    }
}



module.exports = QuestionController;