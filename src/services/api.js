// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const api = {
    getProducts: () => axios.get(`${API_URL}/products`, { withCredentials: true }),
    // Add other API calls here
};