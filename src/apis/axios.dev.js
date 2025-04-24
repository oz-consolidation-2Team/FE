// src/apis/axios.dev.js

import axios from 'axios';

const axiosDev = axios.create({
  baseURL: 'https://seonhm.kr',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosDev.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosDev.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn('개발 환경 - 401');
    }
    return Promise.reject(err);
  }
);

export default axiosDev;
