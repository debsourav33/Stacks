const axios = require("axios");

class StackexchangeService{
    baseUrl = "https://api.stackexchange.com/";

    getQuestions(){
        const questionUrl = this.baseUrl + "/2.3/questions?order=desc&sort=votes&site=stackoverflow";
        return axios.get(questionUrl);
    }
}

module.exports = StackexchangeService;