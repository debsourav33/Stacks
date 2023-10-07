import { useEffect, useState } from "react"
import QuestionsClient from "../api-client/questionsClient";
import "./questionsFeed.css"
export default function QuestionFeed(){
    //useEffect is like componentDidMount
    //only called once (after first render)

    const [questions, setQuestions] = useState([]);
    let renderCount = 0;
    console.log(renderCount+=1);

    useEffect(()=>{
        const questionClient = new QuestionsClient();
        const questionPromise = questionClient.getAllQuestions();

        questionPromise
        .then((res) => {    
            setQuestions(res.data);
            console.log(res.data);
        })
        .catch((err) => console.log(err) );
    },[]);

    
    return (
        <ul className="">
           {questions.map(q => <li key={q.id}> {q.questionBody.body} </li>)}
        </ul>
    )
}