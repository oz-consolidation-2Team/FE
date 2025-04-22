import axiosDev from './axios.dev';
import axiosProd from './axios.prod';

const isDev = import.meta.env.MODE === 'development';

const axiosInstance = isDev ? axiosDev : axiosProd;

export default axiosInstance;