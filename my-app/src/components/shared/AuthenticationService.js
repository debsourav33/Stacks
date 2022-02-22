export default class AuthenticationService{
    static userLabel = 'authenticatedUser';
    static authHeaderLabel = 'authenticationHeader'
    
    static getBasicAuthenticationToken(username, password){
        return "Basic " + window.btoa(username + ':' + password);
    }

    static registerSuccesfulLogin(userName,passWord){
        sessionStorage.setItem(AuthenticationService.userLabel,userName);
        sessionStorage.setItem(AuthenticationService.authHeaderLabel,
            AuthenticationService.getBasicAuthenticationToken(userName,passWord));
    }

    static unregisterLogin(){
        sessionStorage.removeItem(AuthenticationService.userLabel);
    }

    static isLoggedIn(){
        let loggedInUser = sessionStorage.getItem(AuthenticationService.userLabel);
        if(loggedInUser == null)  return false;
        return true;
    }

    static getLoggedInUserName(){
        let loggedInUser = sessionStorage.getItem(AuthenticationService.userLabel);
        return loggedInUser;
    }

    static getRegisteredBasicAuthenticationToken(){
        let token = sessionStorage.getItem(AuthenticationService.authHeaderLabel);
        return token;
    }
}