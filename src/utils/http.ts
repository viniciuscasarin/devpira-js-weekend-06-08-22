import axios from 'axios';
import cachios from 'cachios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

const cachiosInstance = cachios.create(axiosInstance);

export const http = cachiosInstance
