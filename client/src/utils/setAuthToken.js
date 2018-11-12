import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        //applay to every request
        axios.defaults.headers.common['Authorization'] = token;
    }
    else {
        //if not there delete the auth header
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;