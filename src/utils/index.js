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

export const getNotNullList = (list) => {
  console.log('list: ', list);
  if (list === undefined) return [];
  if (!Array.isArray(list)) return [];
  if (!list.length || list.length <= 0) {
    return [];
  }
  return list;
};
