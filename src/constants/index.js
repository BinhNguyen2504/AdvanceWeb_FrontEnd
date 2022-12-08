const PORT = null;
const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:5001/api' : process.env.REACT_APP_API_URL;
const SOCKET_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' : process.env.REACT_APP_SOCKET_ENDPOINT;

export { BASE_URL, PORT, SOCKET_URL };
