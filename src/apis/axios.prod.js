// src/apis/axios.prod.js

import axios from 'axios';

const axiosProd = axios.create({
  baseURL: 'https://seonhm.kr',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosProd.interceptors.request.use((config) => {
  console.log('잘 나오나 ', config);
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosProd.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn('배포 환경 - 401');
    }
    return Promise.reject(err);
  }
);

export default axiosProd;
