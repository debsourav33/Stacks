import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Client from "../../api-client/Client";
import Question from "../questions/Question";

export default function Answers(){
    // host.com/question/:id
    const {qid} = useParams();
    const client = new Client();

    //whether to show question component or not
    const [questionFetched, setQuestionFetched] =  useState(false);

    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        client.setupAuthenticationHeaderFromLocalStorage();

        console.log('Answer Page for qid: ' + qid)
        
        //we could have passed the question and answers as props
        //but when page is refreshed, the props don't persist, the application is basically refreshed
        //so get the question again
        fetchQuestion();
        fetchAnswers();
    },
    [])
    

    return(
        <>
        {questionFetched && <Question question={question}/>}
        <ul>
            {answers.map((answer) =>{
                return <li> {answer.answerBody.answer} </li>;
            })}
        </ul>
        </>
    )
    
    function fetchQuestion(){
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

    function fetchAnswers(){
        const answerPromise = client.getAnswers(qid);
        answerPromise
        .then((res)=>{
            console.log(res.data);
            setAnswers(res.data);

        })
        .catch((err)=>{
            console.log(err);
        })
    }
}