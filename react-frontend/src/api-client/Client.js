import axios from "axios"

export default class Client{
    static questionUrl = "http://localhost:8080/questions";
    static loginUrl = "http://localhost:8083/login";
    static answersUrl = "http://localhost:8082/answers";
    static dummyUserName = "heaps";
    static dummyPassword = "go123";

    async setupAuthenticationHeaderFromLocalStorage(){
        const user = localStorage.getItem("user");
        const password = localStorage.getItem("password");
        this.setupAuthenticationHeader(user,password);
    }

    async setupAuthenticationHeader(userId, password){
        axios.interceptors.request.use(
            config => {
                config.headers.user = userId;
                config.headers.password = password;
                console.log(config.headers);
                return config;
            }
            ,
            (err) => {
                console.log(err);
            }
        )
    }

    getAllQuestions(){
        let url = Client.questionUrl;
        console.log(`Hitting: ${url}`);
        return axios.get(url);
    }

    getQuestion(id){
        return axios.get(Client.questionUrl + `/id/${id}`)
    }

    deleteQuestion(id){
        let url = Client.questionUrl + `/${id}`;
        console.log(`Hitting: ${url}`);
        return axios.delete(url);
    }

    getAnswers(qid){
        let url = Client.answersUrl +  `/questionId/${qid}`
        console.log(`Hitting: ${url}`);
        return axios.get(url);
    }

    postQuestion(title, body){
        const question = {
            title,
            body
        };
        
        let url = Client.questionUrl + `/post`;
        console.log(`Hitting: ${url}`);
        return axios.post(url,question);
    }

    login(userId, password){
        const userObject = {
            userId: userId,
            password: password
        }

        let url = Client.loginUrl;
        console.log(`Hitting: ${url}`);
        return axios.post(url,userObject);
    }

    
}