import axios from 'axios';

// TODO - Update baseURL for production
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

export default axiosInstance;
