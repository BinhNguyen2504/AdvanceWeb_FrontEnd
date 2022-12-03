const PORT = null;
const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:5001/api' : process.env.REACT_APP_API_URL;

export { BASE_URL, PORT };
