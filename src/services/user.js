import http from '../config/config';

const logar = (data) => http.post('/user/login')
const registrar = (data) => http.post('/user/login') 