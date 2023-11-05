const LOGIN_REQUEST = "LOGIN_REQUEST";
const REGISTER_SUCCESFUL_LOGIN = "REGISTER_SUCCESFUL_LOGIN";
const NOTIFY_FAILED_LOGIN = "NOTIFY_FAILED_LOGIN";

const loginRequest = () => {
    return {
        type: LOGIN_REQUEST,
    };
}

const registerSuccesfulLogin = (username, password) => {
    return {
        type: REGISTER_SUCCESFUL_LOGIN,
        username,
        password
    };
}

const notifyFailedLogin = (errorMsg) => {
    return {
        type: NOTIFY_FAILED_LOGIN,
        error: errorMsg
    };
}

export {LOGIN_REQUEST, REGISTER_SUCCESFUL_LOGIN, NOTIFY_FAILED_LOGIN, loginRequest, registerSuccesfulLogin, notifyFailedLogin};