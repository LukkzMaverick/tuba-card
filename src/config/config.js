import axios from 'axios'
import { getToken, removeToken } from './auth';
import history from './history';

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

axios.defaults.headers.post['Content-Type'] = 'application/json'

if (getToken()) {
    http.defaults.headers['x-auth-token'] = getToken();
}

const interceptor = http.interceptors.response.use(
    response => response,
    error => {
        // Error
        const { response: { status } } = error;

        if (error.message === 'Network Error' && !error.response) {
            alert('Erro de conexão')
        }
        switch (status) {
            case 401:
                history.push('/logint')
                removeToken()
                history.go(0)
                break;
            default:
                console.log(status, `Aconteceu um erro ${status}`)
                break;
        }
        axios.interceptors.response.eject(interceptor);
        return Promise.reject(error);
    }
);


export default http