/* eslint-disable prettier/prettier */
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODc3NzY5NzMzNDQ4MjViMTJmYTQxMCIsImVtYWlsIjoidHJhbnRoZXRvYW43NTAxQGdtYWlsLmNvbSIsImNvZGUiOiIwLjkyMzM4MjA4ODQ3NzgwMjYiLCJpYXQiOjE2NzAyNTg1MjEsImV4cCI6MTY3Mjg1MDUyMX0.mNXbsmwjiIgIYQ9A4-xaUzz3r6yNDH131g_4bohcAEw'
  }
});

export const studentGetPresentation = (id) => API.get(`presentation/${id}`);

export const teacherGetPresentation = (id) => API.get(`/presentation/mypresentation/${id}`);

export const getPresentationByPin = (pin) => API.get(`/presentation/getbypin/${pin}`);

export const createGame = (body) => API.post('http://localhost:5001/api/game/creategame', body);

export const updateRoom = (pin, status) => API.put('http://localhost:5001/api/game/updateStatus', {
  pin,
  isOpen: status
});
