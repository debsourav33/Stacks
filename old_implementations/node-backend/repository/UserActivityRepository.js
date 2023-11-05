const AuthenticationRepository = require("./AuthenticationRepository");

class UserActivityRepository{
    static instance;
    userVoteMap = [];

    constructor(){
        if(UserActivityRepository.instance){
            return UserActivityRepository.instance;
        }

        const users = new AuthenticationRepository().dummyCredentials;

        for(const user of users){
            this.userVoteMap[user.userName] = {};
        }

        UserActivityRepository.instance = this;
    }

    storeVoteActivity(userName,qid,votes){
        console.log(`Storing ${votes} votes activity by ${userName} for question: ${qid}`);
        this.userVoteMap[userName][qid] = votes;
        console.log(this.userVoteMap[userName][qid]);
    }

    getVoteStatus(userName,qid){
        if(this.userVoteMap?.[userName]?.[qid]){
            return this.userVoteMap[userName][qid];
        }

        return 0;
    }
}

module.exports = UserActivityRepository;



