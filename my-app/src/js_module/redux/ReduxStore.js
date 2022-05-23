import {createStore} from "redux"
import { loginRequest, notifyFailedLogin, registerSuccesfulLogin } from "./AuthActions";
import authReducer from "./AuthReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(authReducer, composeWithDevTools());

const perform = () => {
    console.log('Initial State', store.getState());
    const unsubscribe = store.subscribe(() => {console.log('Updated State', store.getState());});

    store.dispatch(loginRequest());
    store.dispatch(registerSuccesfulLogin("deb","goo33"));
    store.dispatch(notifyFailedLogin("error in fetch request :("));

    unsubscribe();
}



export default store;







