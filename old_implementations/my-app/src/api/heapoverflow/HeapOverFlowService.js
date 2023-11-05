import axios from "axios"
import AuthenticationService from "../../components/shared/AuthenticationService";

export default class HeapOverFlowService{
    static baseUrl = "http://localhost:8080"
    static baseJpaUrl = HeapOverFlowService.baseUrl //+ "/jpa"
    static userUrl = HeapOverFlowService.baseUrl + "/user"
    static questionJpaUrl = HeapOverFlowService.baseUrl + "/questions"
    static authenticationUserName = "heaps";
    static authenticationPassword = "go123";

    constructor(){
        if(HeapOverFlowService._instance){
            return HeapOverFlowService._instance;
        }
        
        //this.setupAxiosInterceptor();
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

    async setupAxiosInterceptor(){
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
        let url = HeapOverFlowService.questionJpaUrl;
        console.log(`Hitting: ${url}`);
        return axios.get(url);
    }

    retrieveAllQuestionsSortedByVotesAsc(){
        let url = HeapOverFlowService.questionJpaUrl;
        console.log(`Hitting: ${url}`);
        return axios.get(url, {params: {sort_by: "votes", order_by: "asc"}});
    }

    retrieveAllQuestionsSortedByVotesDesc(){
        let url = HeapOverFlowService.questionJpaUrl;
        console.log(`Hitting: ${url}`);
        return axios.get(url, {params: {sort_by: "votes", order_by: "desc"}});
    }

    getQuestion(id){
        return axios.get(HeapOverFlowService.questionJpaUrl + `/${id}`)
    }

    deleteQuestion(id){
        let url = HeapOverFlowService.questionJpaUrl + `/${id}`;
        console.log(`Hitting: ${url}`);
        return axios.delete(url);
    }

    postQuestion(question){
        let url = HeapOverFlowService.questionJpaUrl;
        console.log(`Hitting: ${url}`);
        return axios.post(url,question);
    }

    //comments
    getCommentsByQuestionId(qid){
        let url = HeapOverFlowService.questionJpaUrl + `/${qid}/comments`;
        console.log(`Hitting: ${url}`);
        return axios.get(url);
    }

    postComment(qid, comment){
        let url = HeapOverFlowService.questionJpaUrl + `/${qid}/comments`;
        console.log(`Hitting: ${url}`);
        return axios.post(url,comment);
    }

    //votes
    getVotes(qid){
        let url = HeapOverFlowService.questionJpaUrl + `/${qid}/votes`;
        console.log(`Hitting: ${url}`);
        return axios.get(url);
    }

    postVotes(qid,votes){
        if(typeof votes === 'string')  votes = parseInt(votes);
        const user = AuthenticationService.getLoggedInUserName();

        let url = HeapOverFlowService.questionJpaUrl + `/${qid}/votes`;
        console.log(`Hitting: ${url}`);
        return axios.post(url,{votes, user});
    }

    getMyVoteStatus(qid){
        const user = AuthenticationService.getLoggedInUserName();

        let url = HeapOverFlowService.userUrl + `/${user}/${qid}`;
        console.log(`Hitting: ${url}`);
        return axios.get(url);
    }
}