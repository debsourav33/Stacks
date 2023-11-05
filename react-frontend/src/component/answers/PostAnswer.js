import { useState } from "react";
import Client from '../../api-client/Client'

export function PostAnswer({questionId, onPosted}){
    const [answer, setAnswer] = useState("");

    return(
        <div className="answer-post-container">
        <input
          type="text"
          value={answer}  //make it a controlled component so that it can be reset
          onChange={onAnswerChange}
          placeholder="Type your answer here..."
          className="answer-post-textarea"
        />
        <button onClick={onSubmit} className="answer-post-button">
          Submit
        </button>
      </div>
    )

    function onAnswerChange(event){
        setAnswer(event.target.value);
        console.log(answer)
    }

    function onSubmit(){
        const answerPromise = new Client().postAnswer(questionId, answer);
        answerPromise
        .then((res) => {
          //clear the inputs
          setAnswer("");

          console.log(res); 
          onPosted();
        }) //onPosted callback invoked to refresh the feed
        .catch((err) => console.log(err)); 
    }

}