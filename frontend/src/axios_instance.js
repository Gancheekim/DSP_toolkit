import axios from 'axios';

const instance = axios.create({
  //baseURL: `http://localhost:5000/`,
  baseURL: `http://140.112.175.129:5000/`,
});

export default instance;