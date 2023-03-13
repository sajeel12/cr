import axios from "axios";
import { returnErrors } from "./errorActions";


import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL

} from "../actions/types";

//  Check token & load user

export const loadUser = () => (dispatch, getState) => {
    // user Loading
    dispatch({ type: USER_LOADING })



    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            });
        });
}



// register user 

export const register = ({  isvendor,  isadmin, fullname, username, email, emailpass,phoneno, password }) => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // request body 

    const body = JSON.stringify({ isvendor, isadmin, fullname, username, email,emailpass,phoneno, password });

    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })

}


// login

export const login = ({ username, password }) => dispatch => {
    //Headers


    dispatch(setUserLoading);

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // request body 

    const body = JSON.stringify({ username, password });

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
        
}


// logout 



export const logout = () => dispatch => {

    axios.get('/api/logout')
        .then(() => dispatch({type:LOGOUT_SUCCESS}));
        


};



// setup config 

export const tokenConfig = getState => {

    // get token from localstorage 

    const token = getState().auth.token;

    // headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    // check for token
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;

}

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}