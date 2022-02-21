import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'X-Custom-Header': 'foobar',
    'Authorization': `Bearer ${localStorage.token}`},
  timeout: 5000
});

export default api;