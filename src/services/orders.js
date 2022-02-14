import api from './apiService';

export const getOrders = () => { 
  return api.get("orders");
}

