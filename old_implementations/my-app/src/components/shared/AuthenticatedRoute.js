import { Route, Navigate } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import AuthenticationService from "./AuthenticationService";

function AuthenticatedRoute(childrenParam){
    let children = childrenParam['children'];
    //console.log("Children passed to Authenticated Route");
    //console.log(children);

    return AuthenticationService.isLoggedIn() ? children : <Navigate to="/login" />;
}

export default AuthenticatedRoute;