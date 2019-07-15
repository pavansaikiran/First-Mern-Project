import {
    USER_LOADED,
    USER_LOADING,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    AUTH_ERROR
} from '../actions/types';
import axios from 'axios';
import { returnErrors } from './errorActions'

//checking for the current user if any
export const loadUser = () => (dispatch,getState) => {

    //User loading
    dispatch({type : USER_LOADING});
    axios.get('/api/auth/user', doConfig(getState))
        .then(res => dispatch({
            type : USER_LOADED,
            payload : res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status))
            dispatch({
                type : AUTH_ERROR
            });
        })
}

export const register = ({ name, email, password}) => dispatch => {

    const config = {
        headers : {
            "Content-Type" : "application/json"
        }
    }
    const body = JSON.stringify({ name, email, password })
    axios
        .post('/api/users', body, config)
        .then(function(res){
            dispatch({
                type: REGISTER_SUCCESS,
                payload : res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'))
            dispatch({
                type : REGISTER_FAIL
            })
        })
}

export const login = ({ email , password }) => dispatch => {

    const config = {
        headers : {
            "Content-Type":"application/json"
        }
    } 

    const body = JSON.stringify({ email , password })
    axios.post('api/auth',body,config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload : res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'))
            dispatch({
                type : LOGIN_FAIL
            })
        })
}

export const logout = () => {
    return {
        type : LOGOUT_SUCCESS
    }
}

export const doConfig = (getState) => {
    const token = getState().auth.token;
    const config = {
        headers : {
            "Content-type" : "application/json"
        }
    }
    if(token){
        config.headers['hehe-token'] = token
    }
    return config;
}