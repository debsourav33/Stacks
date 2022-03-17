const HttpError = require('../models/HttpError');
const UserInfo = require('../models/UserInfo');

class AuthenticationController{    
    authHeader = "authorization";
    expectedPrefix = "Basic ";

    constructor(){
        this.authenticate = this.authenticate.bind(this);
    }
    
    dummyCredentials = [
        new UserInfo("deb33","go33"),
        new UserInfo("heaps","siu123"),
        new UserInfo("reddit","usex23")
    ];

    authenticate(req,res,next){
        const authorization = req.headers[this.authHeader].toString();
        console.log(req.headers);
        console.log(authorization);
        console.log(typeof authorization);
        if(authorization.length < this.expectedPrefix.length) {
            console.log("length issue");
            return next(new HttpError('Wrong Format',401));
        }
        
        
        const prefix= authorization.substring(0,this.expectedPrefix.length);
        if(prefix.localeCompare(this.expectedPrefix)){
            console.log("prefix issue");
            return next(new HttpError('Wrong Format',401));
        }

        const base64Token = authorization.substring(prefix.length);
        
        console.log(`Base64Token: ${base64Token}`);
        const userInfo = UserInfo.fromBase64(base64Token);

        let filteredUserInfos = this.dummyCredentials.filter(cred =>{
            return cred.userName.localeCompare(userInfo.userName) == 0;
        });

        for(const user of filteredUserInfos){
            if(user.password.localeCompare(userInfo.password) == 0){
                return res.status(200).json({message: "Authentication Succesful!!!"});
            }
        }
    
    
        res.status(401).json({message: "Invalid UserID/Password"});
    }
    
}


module.exports = AuthenticationController;