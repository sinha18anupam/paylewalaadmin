import React, { useEffect, useState } from 'react';
import './AllProduct.css';
import axios from 'axios';
import ModalAdd from './ModalAdd';
import { ReactComponent as Delete } from '../Asstes/delete.svg';



const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const apiurl = process.env.REACT_APP_API_BASE_URL
 
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apiurl}/api/item/get`);
      if (response.data && Array.isArray(response.data.items)) {
        setProducts(response.data.items);
        console.log(response.data.items)
      } else {
        console.error('API response is not in expected format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProducts();
    
  }, [showModal]);
  const handleAddProduct = async (newProduct) => {
    console.log(newProduct)
    try {
      const response = await axios.post(`${apiurl}/api/item/`,newProduct);
      if (response.status === 200) {
       console.log(Response)
        setShowModal(false); // Close the modal on success
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  const handleDeleteProduct = async (itemid) => {
    try {
      const response = await axios.delete(`${apiurl}/api/item/${itemid}`);
      if (response.status === 200) {
        setProducts(products.filter(product => product.itemid !== itemid));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className='main-Allproduct'>
      <div className='allproduct'>
        <div className='title'><h4>ALL Products</h4></div>
        <div className='add'><button onClick={() => setShowModal(true)}><h3>ADD +</h3></button></div>      </div>
      <div className='product-cards'>
        {Array.isArray(products) && products.map((product) => (
          <div className='card' key={product.itemid}>
            <div className='imagee'>
            <img src={product.img} alt={product.itemname} />
            </div>
            <div className='card-body'>
              <h5>{product.itemname}</h5>
              <p>{product.dec}</p>
              <p>{product.itemid}</p>
              <p>Price: ${product.price}</p>
              <p onClick={() => handleDeleteProduct(product.itemid)}> <Delete/></p>
            </div>
          </div>
        ))}
      </div>
      {showModal && <ModalAdd onClose={() => setShowModal(false)} onSubmit={handleAddProduct} />}
    </div>
  );
}

export default AllProduct;
