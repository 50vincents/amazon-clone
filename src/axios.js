// Fetching library, interact with api
import axios from 'axios';

const instance = axios.create({
  baseURL: '...' // API URL (cloud function)
});

export default instance;