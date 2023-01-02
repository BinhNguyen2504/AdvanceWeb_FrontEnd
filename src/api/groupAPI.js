import axios from 'axios';
import { BASE_URL } from '../constants';

const accessToken = localStorage.getItem('token');
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
    // Authorization:
    //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTA3ODM1ZDJiNGVjOWQ2MTRkOTQ1OSIsImVtYWlsIjoidGhpZW50b2FuY3ViaUBnbWFpbC5jb20iLCJjb2RlIjoiMC41MTM2NzU4ODI4Nzc2NzMxIiwiaWF0IjoxNjcyNjcyNjU2LCJleHAiOjE2NzUyNjQ2NTZ9.vCcNIhNxhXhhTWCvyd44iplDaQ2SM1Uif9mmUEVHd4E'
  }
});

const createGame = async (body) => {
  console.log('api: ', api);
  console.log('token: ', accessToken);
  console.log('storage: ', localStorage.token);
  const { data } = await api.post('/game/creategame', body);
  console.log(' data: ', data);
  return data;
};

export const getPresentationByroomId = (pin, name) => api.put(`/game/join/${name}/${pin}`);

const getGameInGroup = async (groupid) => {
  const { data } = await api.get(`/game/${groupid}`);
  return data;
};

// export const createGame = (body) => api.post('/game/creategame', body);

export default { createGame, getGameInGroup };
