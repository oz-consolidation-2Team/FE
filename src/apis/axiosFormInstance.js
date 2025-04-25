// src/apis/axiosFormInstance.js
import axios from 'axios';

const axiosFormInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosFormInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token'); // 또는 zustand, recoil 등에서 가져와도 됨
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosFormInstance;
