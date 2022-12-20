/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */

import axios from 'axios';
import { BASE_URL } from '../constants/index';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

const axiosBaseQuery =
  ({ baseUrl }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosClient({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      console.log('Axios error: ', err);
      return {
        code: err.code,
        data: err.response.data
      };
    }
  };

export { axiosClient, axiosBaseQuery };
