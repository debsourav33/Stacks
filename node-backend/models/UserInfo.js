class UserInfo{
    constructor(userName, password){
        this.userName = userName;
        this.password = password;
    }

    /**Decodes from base64 token and returns a UserInfo object
     * 
     * @param {String} base64Token window.btoa(username + ':' + password);
     */
    static fromBase64(base64Token){
        let buffer = new Buffer(base64Token,'base64');
        let userColonPassword = buffer.toString();
        console.log(`User:Password = ${userColonPassword}`);
        

        const subStrings = userColonPassword.split(':');

        const userName = subStrings[0];
        let password = "";

        for(let i=1;i<subStrings.length;i++){
            password += subStrings[i];
        }

        console.log(`User:  ${userName}, Password: ${password}`);
        
        return new UserInfo(userName,password);
    }
}

module.exports = UserInfo;