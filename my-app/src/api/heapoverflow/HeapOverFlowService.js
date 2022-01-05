import axios from "axios"
import AuthenticationService from "../../components/shared/AuthenticationService";

export default class HeapOverFlowService{
    static baseUrl = "http://localhost:8080"
    static questionUrl = HeapOverFlowService.baseUrl + "/questions"

    retrieveAllQuestions(){
        return axios.get(HeapOverFlowService.questionUrl);
    }

    deleteQuestion(id){
        let user = AuthenticationService.getLoggedInUserName();
        let url = HeapOverFlowService.baseUrl + "/" + user + "/questions/"+ id;
        console.log(`Hitting: ${url}`);
        return axios.delete(url);
    }
}