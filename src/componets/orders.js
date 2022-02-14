import * as React from 'react';
import { useEffect } from 'react';
import {getOrders} from '../services/orders'
// import axios from 'axios';

export default function Orders() {
 
  const [orders, getStateOrders] = React.useState('');
 
  const getAllOrders = () => {
    getOrders().then(res => {
      if (res.status === 200) {
        const allOrders = JSON.stringify(res.data.data)
        getStateOrders(allOrders);
      } else {
        console.log('erro ao buscar pedidos');
        console.log(res.status);
      }

    }).catch (error => console.log('erro ao buscar pedidos'));
  }

  useEffect(() => {
      getAllOrders();
  }, []);
  return (
    <div>
      <h1> Pedidos </h1>
      <ul>
        { orders }   
      </ul>
    </div>
  );
}