export default class AuthenticationService{
    static label = 'authenticatedUser';

    static registerSuccesfulLogin(userName,passWord){
        sessionStorage.setItem(AuthenticationService.label,userName);
    }

    static unregisterLogin(){
        sessionStorage.removeItem(AuthenticationService.label);
    }

    static isLoggedIn(){
        let loggedInUser = sessionStorage.getItem(AuthenticationService.label);
        if(loggedInUser == null)  return false;
        return true;
    }

    static getLoggedInUserName(){
        let loggedInUser = sessionStorage.getItem(AuthenticationService.label);
        return loggedInUser;
    }
}