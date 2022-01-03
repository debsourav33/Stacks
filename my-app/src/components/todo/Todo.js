import React, { Component } from "react";
import '../shared/login'
import '../../common.css'
import TodoDataService from "../../api/todo/TodoDataService"
import AuthenticationService from "../shared/AuthenticationService"

class Todo extends Component{
    constructor(props){
        super(props);
        this.state = {todos:[]}
        this.generateTodos = this.generateTodos.bind(this);
        this.todosToHtmlListItems = this.todosToHtmlListItems.bind(this);
    }

    componentDidMount(){
        let promise = new TodoDataService().retrieveAllTodos(AuthenticationService.getLoggedInUserName);
        promise.then(response =>{
            let todoList = response.data.map(todo => {
                //console.log(todo);
                return {id: todo.id, task: todo.description};                
            });
            console.log("Mapped Todos From Response");
            this.setState({todos: todoList});
            console.log(this.state);
        });
    }

    render(){
        return(
            <div className="todo">
                <button className="btn btn-warning" onClick={this.retrieveMessageFromBackend}>Poke Backend</button>
                <ul className="list-group">
                    {this.todosToHtmlListItems(this.state.todos)}
                </ul>
            </div>
        );
    }

    retrieveMessageFromBackend(){
        //let promise = new HelloWorldService().executeHelloWorldPathVariableService("Ana");
        let promise = new TodoDataService().retrieveAllTodos(AuthenticationService.getLoggedInUserName);
        promise.then(response => console.log(response.data))
        .catch(error => console.log(error));
        console.log("**Retrieve Message From Backend**");
    }

    generateTodos(todos){
        /*let todos =
        [
            {id: 0, task: 'Eat'},
            {id: 1, task: 'Sleep'},
            {id: 2, task: 'Code'},
            {id: 3, task: 'Repeat'}
        ];*/

        //let ret = todos.map( todo => <li key={todo.id} className="list-group-item"> {todo.task} </li>);
    }

    todosToHtmlListItems(todos){
        let ret = [];
        for(let i=0;i<todos.length;i++){
            let todo = todos[i];
            ret.push(<li key={todo.id} className="list-group-item"> {todo.task} </li>);
        }
        //console.log(ret);
        return ret;
    }
}

export default Todo;