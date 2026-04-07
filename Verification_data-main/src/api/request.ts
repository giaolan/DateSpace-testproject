import axios from 'axios';

const service = axios.create({
  withCredentials: true,
  timeout: 5000,
});

// const token = localStorage.getItem('token');
const token = 'admin'

service.interceptors.request.use(
  (config) => {
    if (token) config.headers['token'] = token
    return config
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log(res);
    return res;
  },
  (error) => {
    console.log(`err${error}`);
    return Promise.reject(error);
  },
);

export default service;
