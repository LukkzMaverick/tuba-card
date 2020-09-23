import axios from 'axios'
import { getToken } from './auth';

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

axios.defaults.headers.post['Content-Type'] = 'application/json'

if (getToken()) {
    http.defaults.headers['x-auth-token'] = getToken();
}

export default http