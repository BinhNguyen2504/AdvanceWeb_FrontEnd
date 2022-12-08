import React from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../constants';

export const socket = io(SOCKET_URL);
export const SocketContext = React.createContext();
