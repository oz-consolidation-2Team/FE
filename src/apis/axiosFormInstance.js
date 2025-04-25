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

axiosFormInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      console.warn('개발 환경 - 401, 토큰 재발급 시도');
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const userType = localStorage.getItem('userType');

        if (!refreshToken || !userType) {
          throw new Error('리프레시 토큰 또는 userType 없음');
        }

        const refreshUrl =
          userType === 'company'
            ? '/company/auth/refresh-token'
            : '/auth/refresh-token';

        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}${refreshUrl}`,
          { refresh_token: refreshToken }
        );

        console.log('[prod 리프레시 잘나오나요!!]', response.data);

        const { accesstoken } = response.data.data;

        localStorage.setItem('access_token', accesstoken);
        originalRequest.headers.Authorization = `Bearer ${accesstoken}`;
        return axiosFormInstance(originalRequest);
      } catch (refreshError) {
        console.error('토큰 재발급 실패', refreshError);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default axiosFormInstance;
