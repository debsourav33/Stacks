import { useState } from 'react'
import Client from '../../api-client/Client';
import './question.css'

export default function Question({question}){
    return (
        <div style={{margin: 15}}>
            <h1> {question.questionBody.title} </h1>
            {question.questionBody.body} <br/>
            by <b> {question.owner} </b>
        </div>
    )
}

export function PostQuestion(){
    const [question, setQuestion] = useState("");
    const [title, setTitle] = useState("")

    return(
        <>
        <div>
            <input 
                type="text" 
                onChange={onTitleChange} 
                placeholder="Enter title..."
                style={{ width: '300px', height: '30px' }}
            />
        </div>
        <div>
            <input 
                type="text" 
                onChange={onQuestionChange} 
                placeholder="Type your question here..."
                style={{ width: '300px', height: '60px' }}
            />

        </div>
        <button onClick={onSubmit}>Submit</button>
        </>
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
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

}