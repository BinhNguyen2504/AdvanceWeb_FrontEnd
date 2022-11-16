import { BASE_URL } from '../constants/index';

const axios = require('axios');

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 1000
});
export default axiosClient;
