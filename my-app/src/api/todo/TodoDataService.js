import axios from "axios"

export default class TodoDataService{
    static serviceUrl = "http://localhost:8080/users"

    retrieveAllTodos(user){
        return axios.get(TodoDataService.serviceUrl + `/${user}/todos`);
    }
}