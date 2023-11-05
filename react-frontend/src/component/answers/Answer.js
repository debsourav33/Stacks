
export default function Answer({answer}){
    
    return(
        <div className="answer-container"> 
        <p className="answer-body"> {answer.answerBody.answer} </p>    
        <div className="answer-owner"> {answer.userId} </div>
        </div>
    )
}