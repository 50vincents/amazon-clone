// Fetching library, interact with api
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://us-central1-clone-18e27.cloudfunctions.net/api'
  // 'http://localhost:5001/clone-18e27/us-central1/api' // API URL (cloud function)
});

export default instance;