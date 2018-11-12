import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST } from './types';

//add post 
export const addpost = postdata => dispatch => {
    axios.post('/api/posts', postdata).then(res => dispatch({
        type: ADD_POST,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

//delete a post
export const deletepost = id => dispatch => {
    axios.delete(`/api/posts/${id}`).then(res => dispatch({
        type: DELETE_POST,
        payload: id
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

// set loading
export const setpostloading = () => {
    return {
        type: POST_LOADING
    }
}

//get post to display 
export const getpost = () => dispatch => {
    dispatch(setpostloading());
    axios.get('/api/posts').then(res => dispatch({
        type: GET_POSTS,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_POSTS,
        payload: null
    }));
}

//get a single post to display 
export const getapost = (id) => dispatch => {
    dispatch(setpostloading());
    axios.get(`/api/posts/${id}`).then(res => dispatch({
        type: GET_POST,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_POST,
        payload: null
    }));
}

//add comment
export const addcomment = (postid, commentdata) => dispatch => {
    axios.post(`/api/posts/comment/${postid}`, commentdata).then(res => dispatch({
        type: GET_POST,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

//delete comment
export const deletecomment = (postid, commentid) => dispatch => {
    axios.delete(`/api/posts/comment/${postid}/${commentid}`).then(res => dispatch({
        type: GET_POST,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

// add a like to a post
export const like = id => dispatch => {
    axios.post(`/api/posts/like/${id}`).then(res => dispatch(getpost())).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

// remove a like to a post
export const removelike = id => dispatch => {
    axios.post(`/api/posts/unlike/${id}`).then(res => dispatch(getpost())).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}