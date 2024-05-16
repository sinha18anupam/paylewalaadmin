import React, { useState } from 'react';
import './Modal.css';

const ModalAdd = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    itemname: '',
    dec: '',
    price: '',
    img: '',
    itempost: ''
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      if (name === 'img' && (file.type === 'image/png' || file.type === 'image/jpeg')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prevData) => ({
            ...prevData,
            img: reader.result // Base64 string
          }));
        };
        reader.readAsDataURL(file);
      } else if (name === 'itempost' && file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prevData) => ({
            ...prevData,
            itempost: reader.result
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>&times;</span>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type='text' name='itemname' value={formData.itemname} onChange={handleChange} required />
          </label>
         
          <label>
            Price:
            <input type='number' name='price' value={formData.price} onChange={handleChange} required />
          </label>
          <label>
            Image:
            <input type='file' name='img' accept='image/png, image/jpeg' onChange={handleChange} required />
          </label>
          <label>
            Video:
            <input type='file' name='itempost' accept='video/*' onChange={handleChange} required />
          </label>
          <label>
            Description:
            <textarea name='dec' value={formData.dec} onChange={handleChange} required />
          </label>
          <button type='submit'>Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default ModalAdd;
