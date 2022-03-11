import axios from "axios"
import AuthenticationService from "../../components/shared/AuthenticationService";

export default class HeapOverFlowService{
    static baseUrl = "http://localhost:8080"
    static baseJpaUrl = HeapOverFlowService.baseUrl //+ "/jpa"
    static questionJpaUrl = HeapOverFlowService.baseUrl + "/questions"
    static authenticationUserName = "heaps";
    static authenticationPassword = "go123";

    constructor(){
        if(HeapOverFlowService._instance){
            console.log("Returning cached instance");
            return HeapOverFlowService._instance;
        }

        console.log("Returning new instance");
        
        this.setupAxiosInterceptor();
        HeapOverFlowService._instance = this;
    }

    

    //For login, we don't setup axios interactor. So, manually send the auth header.
    authenticate(username, password){
        let token = AuthenticationService.getBasicAuthenticationToken(username, password)
        console.log("Trying to authenticate using username: " + username +", pass: " + password +", token: "+token);
        return [
            axios.get(HeapOverFlowService.baseUrl+"/basicauth",
            {
                headers : {authorization : token}
            }),
            () => {
                this.setupAxiosInterceptor();
            }
        ]
        ;
    }

    setupAxiosInterceptor(){
        if(!AuthenticationService.isLoggedIn())  return;
        axios.interceptors.request.use(
            (config) => {
                let basicAuthHeader = AuthenticationService.getRegisteredBasicAuthenticationToken();
                config.headers.authorization = basicAuthHeader;
                console.log("Basic Auth Set: "+ basicAuthHeader);
            
                return config;
            }, null, { synchronous: true }
        );
    }

    retrieveAllQuestions(){
        return axios.get(HeapOverFlowService.questionJpaUrl);
    }

    deleteQuestion(id){
        let url = HeapOverFlowService.baseJpaUrl + "/questions/"+ id;
        console.log(`Hitting: ${url}`);
        return axios.delete(url);
    }

    postQuestion(question){
        let url = HeapOverFlowService.baseJpaUrl + "/questions";
        console.log(`Hitting: ${url}`);
        return axios.post(url,question);
    }
}