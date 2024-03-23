import axios from 'axios';

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env['API_URL'] || '/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};

export const apiClient = createAxiosInstance();

const createAxiosStaticInstance = () => {
  const instance = axios.create({
    baseURL: process.env['API_URL'] || '/',
  });

  return instance;
};

export const apiStaticClient = createAxiosStaticInstance();
