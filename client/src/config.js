
const isDevelopment = import.meta.env.MODE === 'development';

const API_URL = isDevelopment
    ? '/api' // Use proxy in development
    : (import.meta.env.VITE_API_URL || 'http://localhost:5001') + '/api'; // Append /api for production

export default API_URL;
