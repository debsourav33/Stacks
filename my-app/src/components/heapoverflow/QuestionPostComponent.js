import React, { Component } from "react";
import HeapOverFlowService from "../../api/heapoverflow/HeapOverFlowService";
import './QuestionPostComponent.css'

class QuestionPostComponent extends Component{
    #titleAttr = 'title'
    #descriptionAttr = 'description'

    constructor(props){
        super(props);
        this.state = {[this.#titleAttr]:'', [this.#descriptionAttr]:''};
        this.onInputChange = this.onInputChange.bind(this);
        this.postQuestion = this.postQuestion.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        return false;
    }

    onInputChange(event) {
        this.setState({
            [event.target.name] : event.target.value //[username] : asd , [password]: 123
        });
    }

    postQuestion(){
        console.log(this.state[this.#titleAttr]);
        console.log(this.state[this.#descriptionAttr]);

        const newQuestion = {
            title: this.state[this.#titleAttr],
            description: this.state[this.#descriptionAttr]
        };
        
        new HeapOverFlowService().postQuestion(newQuestion)
        .then(resolve => {
            console.log("Succesfully posted question");
            console.log(resolve);
        }).catch(error =>{
            console.log("Error in posting question");
            console.log(error);
        });

        
    }

    render(){
        return(
            <div className="login">
                <div>
                <input type="text" placeholder="Title" name ={this.#titleAttr} onChange={this.onInputChange} className="title"/>
                </div>
                <div>
                <input type="text" placeholder="Detailed Question" name ={this.#descriptionAttr} onChange={this.onInputChange} className="description"/>
                </div>
                <div>
                <button type="submit" className="btn btn-warning" style={{margin: '10px'}} onClick={this.postQuestion}>Post</button>
                </div>
                
                
            </div>
        )
    }    
}

export default QuestionPostComponent;