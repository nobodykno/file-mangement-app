import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * 
 * @returns true if token is present
 */

const authnitcate = () => {
    let token = localStorage.getItem('token');
    if (token == '12345') {
        return true;
    }
    else {
        return false;
    }
}

/**
 * 
 * @returns the child route if true else login
 */

const AuthGueard = () => {


    if (authnitcate()) {
        return <Outlet />
    }
    else {
        return <Navigate to="/login" replace />
    }

}

export default AuthGueard