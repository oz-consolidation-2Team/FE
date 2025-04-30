// src/apis/axiosPublicInstance.js
import axios from 'axios';

const axiosPublicInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosPublicInstance;
