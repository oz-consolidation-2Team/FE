import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMCIsImV4cCI6MTc0NTQ5MDE5Mn0.L9hPXdTIquLbxyC-XL53Tq63W_4ktAWyFuKbn-RKjek';

export const axiosTest = axios.create({
  baseURL: 'https://seonhm.kr',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const axiosFormTest = axios.create({
  baseURL: 'https://seonhm.kr',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
