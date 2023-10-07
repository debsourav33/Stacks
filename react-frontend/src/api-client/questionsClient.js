import axios from "axios"

export default class QuestionsClient{
    static questionUrl = "http://localhost:8080/questions"
    static dummyUserName = "heaps";
    static dummyPassword = "go123";

    getAllQuestions(){
        let url = QuestionsClient.questionUrl;
        console.log(`Hitting: ${url}`);
        return axios.get(url);
    }

    getQuestion(id){
        return axios.get(QuestionsClient.questionUrl + `/${id}`)
    }

    deleteQuestion(id){
        let url = QuestionsClient.questionUrl + `/${id}`;
        console.log(`Hitting: ${url}`);
        return axios.delete(url);
    }

    postQuestion(question){
        let url = QuestionsClient.questionUrl;
        console.log(`Hitting: ${url}`);
        return axios.post(url,question);
    }

    
}