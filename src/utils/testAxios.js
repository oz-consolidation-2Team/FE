import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4IiwiZXhwIjoxNzQ1NTEwNzY2fQ.CIttnrjhXfEaxZ-jBWuB7WtBf_4W01bWv2_zQyZYQGo';
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
