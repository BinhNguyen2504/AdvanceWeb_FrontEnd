import axios from 'axios';
import { BASE_URL } from '../constants';

const accessToken = localStorage.getItem('token');
const network = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

export default { accessToken, network };
