const HttpError = require('../models/HttpError');
const Question = require('../models/Question');
const QuestionRepository = require('../repository/QuestionRepository');
const StackOverFlowService = require('../routes/StackExchange');

class QuestionController{
    questionRepository = new QuestionRepository();
 
    constructor(){
        this.getAllQuestions = this.getAllQuestions.bind(this);
        this.getQuestionByQuestionId = this.getQuestionByQuestionId.bind(this);
        this.saveQuestion = this.saveQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.sortQuestions = this.sortQuestions.bind(this);
    }

    async getAllQuestions(req,res,next){
        let questions = await this.questionRepository.getAllQuestions();
        if(!questions){
            return next(new HttpError("Can't retrieve questions!"));
        }

        //questions?sort_by=votes&order_by=asc
        //{sort_by: "votes", order_by:"asc"}
        
        console.log(req.query);
        this.sortQuestions(questions, req.query?.["sort_by"], req.query?.["order_by"] === "asc");
        return res.json({questions});
    }

    sortQuestions(questions,by, isAscending){
        console.log(by,isAscending);
        if(by === undefined || isAscending === undefined){
            return;
        }
        

        if(by === "votes"){
            console.log(`Sorting by vote and is Ascending: ${isAscending}`)
            const sortedQuestions = isAscending ? questions.sort((a,b) => {return a.votes - b.votes}) : questions.sort((a,b) => {return b.votes - a.votes});
            console.log(sortedQuestions);
        }
    }

    getQuestionByQuestionId(req,res,next){
        const qid = parseInt(req.params.qid); // {qid: '1'}
        console.log('Get request for question: ');
        const question = this.questionRepository.getDummyQuestionById(qid);
    
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

        this.questionRepository.saveQuestion(createdQuestion);
        res.status(201).json({question: createdQuestion});
    }

    deleteQuestion(req,res,next){
        const qid = parseInt(req.params.qid);
        this.questionRepository.deleteQuestion(qid);
        res.status(200).json({message: `Question Deleted with id: ${qid}`});
    }
}

module.exports = QuestionController;