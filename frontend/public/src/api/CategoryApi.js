// src/api/CategoryApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5001/api/categories';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getCategories = () => {
  return axios.get('http://localhost:5001/api/categories'); // update URL if needed
};

export const createCategory = (categoryData) =>
  axios.post(BASE_URL, categoryData, getAuthHeader());

export const deleteCategory = (id) =>
  axios.delete(`${BASE_URL}/${id}`, getAuthHeader());

export const updateCategory = (id, categoryData) =>
  axios.put(`${BASE_URL}/${id}`, categoryData, getAuthHeader());
