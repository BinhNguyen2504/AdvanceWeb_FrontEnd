import axiosClient from './client';

const authApi = {
  loginUser: async (data) => {
    const url = '/auth/login';
    try {
      const response = await axiosClient.post(url, data);
      return response;
    } catch (err) {
      if (err.response.data) return err.response.data;
      return err;
    }
  },
  registerUser: async (data) => {
    const url = '/auth/register';
    try {
      const response = await axiosClient.post(url, data);
      return response;
    } catch (err) {
      if (err.response.data) return err.response.data;
      return err;
    }
  }
};
export default authApi;
