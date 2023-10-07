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