import React, { useEffect, useState } from 'react';
import './Order.css';
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const apiurl = process.env.REACT_APP_API_BASE_URL
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiurl}/api/oder/get`);
        if (response.data && Array.isArray(response.data.products)) {
          setOrders(response.data.products);
          console.log(response.data.products);
        } else {
          console.error('API response is not in expected format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='main-page-order'>
      <h2>Order Summary</h2>
      <div className='order-cards'>
        {orders.map((product) => (
          <div className='order-card' key={product.oid}>
            <img src={product.img} alt={product.productname} />
            <div className='order-details'>
              <h3>{product.productname}</h3>
              <p>Quantity: {product.quantity}</p>
              <p>Price: ${product.price}</p>
              <p>Status: {product.status === 0 ? 'Pending' : 'Completed'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
