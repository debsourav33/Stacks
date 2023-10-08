import { useEffect, useState } from "react"
import Client from "../../api-client/Client";
import Question from "./Question";
import "./questionsFeed.css"
import { PostQuestion } from "./Question";

export default function QuestionFeed(){
    //useEffect is like componentDidMount
    //only called once (after first render)

    const [questions, setQuestions] = useState([]);
    let renderCount = 0;
    console.log(renderCount+=1);

    useEffect(()=>{
        const questionClient = new Client();
        const questionPromise = questionClient.getAllQuestions();

        questionPromise
        .then((res) => {    
            setQuestions(res.data);
            console.log(res.data);
        })
        .catch((err) => console.log(err) );
    },[]);

    
    return (
        <div className="middle">
            <PostQuestion/>
           {questions.map(q => <Question question={q} key={q.id}/>)}
        </div>
    )
}