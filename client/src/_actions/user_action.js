import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
}
from './types';
export function loginUser(dataTosubmit){

    
    const request = axios.post('/api/users/login',dataTosubmit)
    .then(response=>response.data)

    return { //받은 값을 reducer에 넘김
        type : LOGIN_USER,
        payload : request
    }

}
export function registerUser(dataTosubmit){

    
    const request = axios.post('/api/users/register',dataTosubmit)
    .then(response=>response.data)

    return { //받은 값을 reducer에 넘김
        type : REGISTER_USER,
        payload : request
    }

}
