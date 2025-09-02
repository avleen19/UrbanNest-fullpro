import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // change if your backend uses a different port or path
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach token if exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
