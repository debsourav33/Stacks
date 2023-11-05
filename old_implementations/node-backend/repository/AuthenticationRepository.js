const UserInfo = require('../models/UserInfo');

class AuthenticationRepository{
    static instance = undefined;

    constructor(){
        if(AuthenticationRepository.instance)  return AuthenticationRepository.instance;

        AuthenticationRepository.instance = this;
    }
    
    dummyCredentials = [
        new UserInfo("deb33","go33"),
        new UserInfo("heaps","siu123"),
        new UserInfo("reddit","usex23")
    ];

    

    userExists(uid){
        for(let user of this.dummyCredentials){
            if(user.userName.localeCompare(uid) === 0)  return true;
        }

        return false;
    }
}

module.exports = AuthenticationRepository;