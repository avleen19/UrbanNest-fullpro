// // services/api.js
// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api';

// export const fetchProducts = () => axios.get(`${BASE_URL}/products`);
// export const fetchProductById = (id) => axios.get(`${BASE_URL}/products/${id}`);
// export const fetchCategories = () => axios.get(`${BASE_URL}/categories`);
// export const fetchItemsByProduct = (productId) => axios.get(`${BASE_URL}/items/${productId}`);

// export const fetchCartDetails = (cartIds) => Promise.all(cartIds.map(id => fetchProductById(id)));

// export const placeOrder = (orderData) => axios.post(`${BASE_URL}/orders`, orderData);
// export const makePayment = (paymentData) => axios.post(`${BASE_URL}/payments`, paymentData);

// export const registerUser = (data) => axios.post(`${BASE_URL}/users/register`, data);
// export const loginUser = (data) => axios.post(`${BASE_URL}/users/login`, data);

// export const fetchOrdersByCustomer = (customerId) => axios.get(`${BASE_URL}/orders?customerId=${customerId}`);
// export const fetchUsers = () => axios.get(`${BASE_URL}/users`);
// export const fetchRoles = () => axios.get(`${BASE_URL}/roles`);
// export const fetchPermissions = () => axios.get(`${BASE_URL}/permissions`);
