import axios from 'axios';

const API_BASE = 'http://localhost:5001/api/products';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllProducts = () => axios.get(API_BASE, getAuthHeader());

export const deleteProduct = (id) => axios.delete(`${API_BASE}/${id}`, getAuthHeader());

export const addProduct = (product) => axios.post(API_BASE, product, getAuthHeader());

export const updateProduct = (id, product) =>
  axios.put(`${API_BASE}/${id}`, product, getAuthHeader());
