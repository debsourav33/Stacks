import LoginComponent from "./login";
import React, { Component } from "react";
import './login.css'
import '../../common.css'
import { Link } from "react-router-dom";

class Todo extends Component{
    constructor(props){
        super(props);
        this.generateTodos = this.generateTodos.bind(this);
    }

    render(){
        return(
            <div className="todo">
                <ul className="list-group">
                    {this.generateTodos()}
                </ul>
            </div>
        );
    }

    generateTodos(){
        let todos =
        [
            {id: 0, task: 'Eat'},
            {id: 1, task: 'Sleep'},
            {id: 2, task: 'Code'},
            {id: 3, task: 'Repeat'}
        ];

        //let ret = todos.map( todo => <li key={todo.id} className="list-group-item"> {todo.task} </li>);
        let ret = [];
        for(let i=0;i<todos.length;i++){
            let todo = todos[i];
            ret.push(<li key={todo.id} className="list-group-item"> {todo.task} </li>);
        }
        console.log(ret);
        return ret;
    }
}

export default Todo;