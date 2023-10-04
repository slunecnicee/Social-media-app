import axios from 'axios';

const baseUrl = axios.create({
  baseURL: 'https://social-media-back-end-936o.onrender.com/api', 
});

export default baseUrl;