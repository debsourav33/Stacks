import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Client from "../../api-client/Client";
import Question from "../questions/Question";
import './answer.css'
import Answer from "./Answer";
import { PostAnswer } from "./PostAnswer";

export default function Answers(){
    // host.com/question/:id
    const {qid} = useParams();
    const client = new Client();

    //whether to show question component or not
    const [questionFetched, setQuestionFetched] =  useState(false);

    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        client.setupAuthHeaderFromLocalStorage();

        console.log('Answer Page for qid: ' + qid)
        
        //we could have passed the question and answers as props
        //but when page is refreshed, the props don't persist, the application is basically refreshed
        //so get the question again
        fetchQuestion(qid);
        fetchAnswers(qid);
    },
    [])
    

    return(
        <div className="answer-feed-container"> 
        {questionFetched && <Question question={question} showAnswerButton={true}/>}
        <PostAnswer questionId={question.id} onPosted={onAnswerPosted}/> 
        {answers.map((answer) => 
            <Answer answer={answer} key={answer.id}/>
        )}
    
        </div>
    )
    
    //when answer is posted, we refresh the answer list
    function onAnswerPosted(){
        fetchQuestion(qid); //only do this to update the answer count on the button (TODO: just update the answer count directly)
        fetchAnswers(qid);
    }
    
    function fetchQuestion(qid){
        const questionPromise = client.getQuestion(qid);
        questionPromise
        .then((res)=>{
            setQuestionFetched(true);
            console.log(res.data);
            setQuestion(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function fetchAnswers(qid){
        const answerPromise = client.getAnswers(qid);
        answerPromise
        .then((res)=>{
            let reversed_answers = res.data.reverse();
            console.log(reversed_answers);
            setAnswers(reversed_answers);

        })
        .catch((err)=>{
            console.log(err);
        })
    }
}