import React from 'react';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:5001');
export const SocketContext = React.createContext();
