import axios from 'axios';

const API_BASE = 'http://localhost:5001/api/products';

export const getAllProducts = () => axios.get(API_BASE);
export const createProduct = (data) => axios.post(API_BASE, data);
export const updateProduct = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE}/${id}`);
