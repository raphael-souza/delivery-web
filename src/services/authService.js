import api from './apiService';

export const login = (user) => {
  debugger
  return api.post("login",{ user});
}

export const getToken = (data) => {

  debugger
  localStorage.token = data;

  console.log('token salvo com sucesso! ' + localStorage.token)
}
