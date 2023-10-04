import axios from 'axios';

const baseUrl = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

export default baseUrl;