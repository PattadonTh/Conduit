import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'https://api.example.com', // Use environment variable if available
  withCredentials: true
});

export default instance;
