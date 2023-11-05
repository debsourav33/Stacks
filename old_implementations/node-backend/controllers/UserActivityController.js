const AuthenticationRepository = require("../repository/AuthenticationRepository");
const UserActivityRepository  = require("../repository/UserActivityRepository");

class UserActivityController{
    repository = new UserActivityRepository();
    authenticationRepostory = new AuthenticationRepository();

    getVoteStatus = (req,res,next) => {
        const uid = req.params.uid;
        const qid = parseInt(req.params.qid);

        console.log("Check vote");
        console.log(uid);
        console.log(qid);


        if(!this.authenticationRepostory.userExists(uid)){
            res.status(400).json({message: `${uid} doesn't exist`});
        }

        let ret = this.repository.getVoteStatus(uid,qid);

        if(!ret)  ret = 0;
        
        res.json({user_id: uid, vote: ret, question_id: qid});
    }
}

module.exports = UserActivityController;
