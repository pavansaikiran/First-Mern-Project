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

const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated : null,
    isLoading : false,
    user : null
};

export default function(state = initialState, action){
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading : true
            };
        case USER_LOADED:
            return{
                ...state,
                user : action.payload,
                isAuthenticated : true,
                isLoading : false
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            console.log("reducer call successful")
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated : true,
                isLoading : false
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return{
                ...state,
                isAuthenticated : false,
                isLoading : false,
                token : null,
                user : null
            };
        default:
            return state;
    }
}