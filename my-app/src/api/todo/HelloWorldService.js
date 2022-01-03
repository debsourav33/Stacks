import axios from "axios";


export default class HelloWorldService{
    static serviceUrl = "http://localhost:8080/hello-world";

    executeService(){
        return axios.get(HelloWorldService.serviceUrl);
    }

    executeHelloWorldPathVariableService(name){
        return axios.get(HelloWorldService.serviceUrl + `/${name}`)
    }




}