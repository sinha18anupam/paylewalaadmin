import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Product } from '../Asstes/product.svg';
import { ReactComponent as Order } from '../Asstes/order.svg';
import { ReactComponent as History } from '../Asstes/history.svg';
import { ReactComponent as Data } from '../Asstes/data.svg';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='Main-Navbar'>
      <div className='navbar-items'>
        <li onClick={() => navigate('/')}>
          <Product />
          <span className="hide-text">All products</span>
        </li>
        <li onClick={() => navigate('/order')}>
          <Order />
          <span className="hide-text">Orders</span>
        </li>
        <li>
          <History />
          <span className="hide-text">Order History</span>
        </li>
        <li>
          <Data/>
          <span className="hide-text">User Data</span>
        </li>
      </div>
    </div>
  );
};

export default Navbar;
