import { LOGIN_REQUEST, NOTIFY_FAILED_LOGIN, REGISTER_SUCCESFUL_LOGIN } from "./AuthActions";

const initialState = {
    loading: false,
    username: "",
    password: "",
    error: ""
};

// (previousState, action) => nextState
const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case REGISTER_SUCCESFUL_LOGIN:
            return {
                ...state,
                loading: false,
                username: action.username,
                password: action.password
            };
        case NOTIFY_FAILED_LOGIN:
                return {
                    ...state,
                    loading: false,
                    username: "",
                    password: "",
                    error: action.error,
                };
        default:
            return state;
    }
}

export default reducer;