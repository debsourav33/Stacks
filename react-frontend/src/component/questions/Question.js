import { useState } from 'react'
import Client from '../../api-client/Client';
import './question.css'


export default function Question({ question }) {
    return (
      <div className="question-container">
        <h1 className="question-title">{question.questionBody.title}</h1>
        <p className="question-body">{question.questionBody.body}</p>
        <p className="question-owner">
          by <b>{question.owner}</b>
        </p>
      </div>
    );
}
  

export function PostQuestion({onPosted}){
    const [question, setQuestion] = useState("");
    const [title, setTitle] = useState("")

    return(
        <div className="question-post-container">
        <input
          type="text"
          value={title} //make it a controlled component so it can be reset
          onChange={onTitleChange}
          placeholder="Enter title..."
          className="question-post-input"
        />
        <input
          type="text"
          value={question}  //make it a controlled component so it can be reset
          onChange={onQuestionChange}
          placeholder="Type your question here..."
          className="question-post-textarea"
        />
        <button onClick={onSubmit} className="question-post-button">
          Submit
        </button>
      </div>
    )

    function onTitleChange(event){
        setTitle(event.target.value);
        console.log(title)
    }

    function onQuestionChange(event){
        setQuestion(event.target.value);
        console.log(question)
    }

    function onSubmit(){


        const questionPromise = new Client().postQuestion(title, question);
        questionPromise
        .then((res) => {
          //clear the inputs
          setTitle("");
          setQuestion("");

          console.log(res); 
          onPosted();
        }) //onPosted callback invoked to refresh the feed
        .catch((err) => console.log(err));
    }

}