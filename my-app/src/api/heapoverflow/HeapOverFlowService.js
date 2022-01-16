import axios from "axios"
import AuthenticationService from "../../components/shared/AuthenticationService";

export default class HeapOverFlowService{
    static baseUrl = "http://localhost:8080"
    static questionUrl = HeapOverFlowService.baseUrl + "/questions"
    static authenticationUserName = "heaps";
    static authenticationPassword = "go123";

    interceptorInitialized = false;

    constructor(){
        if(AuthenticationService.isLoggedIn() && !this.interceptorInitialized){
            this.setupAxiosInterceptor(AuthenticationService.getLoggedInUserName, HeapOverFlowService.authenticationPassword);
        }
    }

    getBasicAuthenticationToken(username, password){
        return "Basic " + window.btoa(username + ':' + password);
    }

    //For login, we don't setup axios interactor. So, manually send the auth header.
    authenticate(username, password){
        let token = this.getBasicAuthenticationToken(username, password)
        console.log("Trying to authenticate using username: " + username +", pass: " + password +", token: "+token);
        return axios.get(HeapOverFlowService.baseUrl+"/basicauth",
        {
            headers : {authorization : token}
        });
    }

    setupAxiosInterceptor(username, password){
        let basicAuthHeader = this.getBasicAuthenticationToken(username, password);
        axios.interceptors.request.use(
            (config) => {
                if(AuthenticationService.isLoggedIn()){
                    config.headers.authorization = basicAuthHeader;
                    this.interceptorInitialized = true;
                    console.log("Basic Auth Set: "+ basicAuthHeader);
                }
                
                return config;
            }, null, { synchronous: true }
        );
    }

    retrieveAllQuestions(){
        return axios.get(HeapOverFlowService.questionUrl);
    }

    deleteQuestion(id){
        let user = AuthenticationService.getLoggedInUserName();
        let url = HeapOverFlowService.baseUrl + "/" + user + "/questions/"+ id;
        console.log(`Hitting: ${url}`);
        return axios.delete(url);
    }

    postQuestion(question){
        let user = AuthenticationService.getLoggedInUserName();
        let url = HeapOverFlowService.baseUrl + "/" + user + "/questions";
        console.log(`Hitting: ${url}`);
        return axios.post(url,question);
    }
}