import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {'X-Custom-Header': 'foobar'},
  timeout: 5000
});

// api.baseURL 
export default api;