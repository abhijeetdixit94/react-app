import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

// register user
export const registeruser = (userData, history ) => dispatch => {
    axios.post('/api/users/register', userData).then(res => history.push('/login')).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};

// login user get user token
export const loginuser = (userData) => dispatch => {
    axios.post('api/users/login', userData).then(res =>{
        //save to localstorage
        const { token } = res.data;
        //set  token to localstorage
        localStorage.setItem('jwtToken', token);
        // set token to auth header
        setAuthToken(token);
        //decode token to get user data from db
        const decoded = jwt_decode(token);
        // set current user
        dispatch(setCurrentUser(decoded));
    }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};

//set loggedin user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//logout 
export const logoutuser = () => dispatch => {
    // remove the token from localstorage
    localStorage.removeItem('jwtToken');
    // remove auth header for future requests
    setAuthToken(false);
    // set the current user to empty obj which will also set isauthenticate to false
    dispatch(setCurrentUser({}));
}