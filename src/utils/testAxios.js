import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMCIsImV4cCI6MTc0NTQwMDc4OX0.a8ZP3kYWhX-ipwnhh6fl5gsL_M2lY2yi27iuwXg1iTE';

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
