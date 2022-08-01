import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});


export const http = axiosInstance
