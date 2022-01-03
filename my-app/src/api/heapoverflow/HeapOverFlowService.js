import axios from "axios"

export default class HeapOverFlowService{
    static baseUrl = "http://localhost:8080"
    static questionUrl = HeapOverFlowService.baseUrl + "/questions"

    retrieveAllQuestions(){
        return axios.get(HeapOverFlowService.questionUrl);
    }
}