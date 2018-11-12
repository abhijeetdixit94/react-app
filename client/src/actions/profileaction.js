import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_PROFILES } from './types';

//get current profile
export const getcurrentProfile = () => dispatch => {
    dispatch(setprofileLoading());
    axios.get('/api/profile').then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_PROFILE,
        payload: {}
    }));
}

//create profile
export const createprofile = (profiledata, history) => dispatch => {
    axios.post('/api/profile', profiledata).then(res => history.push('/dashboard')).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

// add experience
export const addexperience = (expdata, history) => dispatch => {
    axios.post('/api/profile/experience', expdata).then(res => history.push('/dashboard')).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

// add education
export const addeducation = (edudata, history) => dispatch => {
    axios.post('/api/profile/education', edudata).then(res => history.push('/dashboard')).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

// delete experience
export const deleteexperience = (id) => dispatch => {
    axios.delete(`/api/profile/experience/${id}`).then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

// delete education
export const deleteeducation = (id) => dispatch => {
    axios.delete(`/api/profile/education/${id}`).then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

//delete account and profile
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure to delete your account')) {
        axios.delete('/api/profile').then(res => dispatch({
            type: SET_CURRENT_USER,
            payload: {}
        })).catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
    }
}

//profile loading
export const setprofileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

//clear profile 
export const clearcurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

//get all profiles
export const getprofiles = () => dispatch => {
    dispatch(setprofileLoading());
    axios.get('/api/profile/all').then(res => dispatch({
        type: GET_PROFILES,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_PROFILES,
        payload: null
    }));
}

//get profile by handle
export const getprofilebyhandle = (handle) => dispatch => {
    dispatch(setprofileLoading());
    axios.get(`/api/profile/handle/${handle}`).then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_PROFILE,
        payload: null
    }));
}