import axios from 'axios';
import {
    LOGIN_USER
}
from './types';
export function loginUser(dataTosubmit){

    
    const request = axios.post('/api/users/login',dataTosubmit)
    .then(response=>response.data)

    return { //받은 값을 reducer에 넘김
        type : "LOGIN_USER",
        payload : request
    }

}