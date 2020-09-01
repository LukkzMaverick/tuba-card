import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3001/api'
})

axios.defaults.headers.post['Content-Type'] = 'application/json'

export default http