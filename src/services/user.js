import http from '../config/config';

const logar = (data) => http.post('/user/login', data)
const registrar = (data) => http.post('/user/register', data) 

export default {logar, registrar}