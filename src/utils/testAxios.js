import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMCIsImV4cCI6MTc0NTUwNjI0MH0.NFOBJCvxpftuY-R1z9WtCecaPJKzfMXI7wovRZ2lRWQ';
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
