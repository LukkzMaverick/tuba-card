import axios from 'axios'
import { getToken } from './auth';

const http = axios.create({
    baseURL: 'http://localhost:3001/api'
})

axios.defaults.headers.post['Content-Type'] = 'application/json'

if (getToken()) {
    http.defaults.headers['x-auth-token'] = getToken();
}

export default http