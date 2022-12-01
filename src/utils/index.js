/* eslint-disable dot-notation */
import { axiosClient } from '../api/client';

const setAuthHeader = (token) => {
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common['Authorization'];
  }
};
export default setAuthHeader;
