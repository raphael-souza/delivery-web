import api from './apiService';
import axios from 'axios';

export const login = (user) => {
  debugger 
  return axios.post('http://localhost:3000/api/login',{ user});
}

export const getToken = (data) => {
  localStorage.token = data;

  console.log('token salvo com sucesso! ' + localStorage.token)
}
