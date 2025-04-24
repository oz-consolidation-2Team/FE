import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4IiwiZXhwIjoxNzQ1NTE0NTQyfQ.iChFyQ6uy2-PuQLewsx9Gfqc1UKuKKtP9DZOrJDMU5w';
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
