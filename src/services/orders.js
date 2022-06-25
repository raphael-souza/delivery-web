import api from './apiService';

export const getOrders = () => { 
  return api.get("orders");
}

export const createOrder = (orderForm) => { 
  console.info("foi feito o POST createOrder.")
  // TODO: encapsular essa lógica de montar o payload no formato fastJsonAPI

  const payload = { data: 
    {
      attributes: {
        description: orderForm.get('description'),
        formated_address: orderForm.get('formatedAddress'),
        recipient_name: orderForm.get('recipientName'),
        value: orderForm.get('price'),
        lat: orderForm.get('lat'),
        long: orderForm.get('long'),
      }
    }
  }; 

  return api.post("orders", payload);
}

