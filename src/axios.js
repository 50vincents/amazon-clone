// Fetching library, interact with api
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001/clone-18e27/us-central1/api' // API URL (cloud function)
});

export default instance;