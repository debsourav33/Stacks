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

    const client = new Client();
    
    // useEffect is similar to componentDidMount()
    //runs only once after the render is done (so questions are not fetched multiple times if it's placed inside return/render)
    useEffect(()=>{
        setUserHeader(); //set user header every time page refreshes
        fetchQuestions();
    },[]);

    
    return (
        <div className="question-feed-container">
            <PostQuestion onPosted={onPosted}/>
            <h1 className="question-feed-title">Questions Feed</h1>
            {questions.map((q) => (
            <Question question={q} key={q.id} />
            ))}
      </div>
        
    )

    function fetchQuestions(){
        const questionPromise = client.getAllQuestions();

        questionPromise
        .then((res) => {   
            const reversedData = res.data.reverse();  
            setQuestions(reversedData);
            console.log(reversedData);
        })
        .catch((err) => console.log(err) );
    }

    function onPosted(){
        fetchQuestions();
    }
    
    //in terms of page refresh, fetch from local storage and set the header again
    function setUserHeader(){
        const user = localStorage.getItem("user");
        const password = localStorage.getItem("password");

        client.setupAuthenticationHeader(user,password);
    }
}