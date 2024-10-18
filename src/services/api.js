// src/services/api.js
/**
 * API service module for handling all API calls.
 * Centralizes API endpoint configuration and axios instance setup.
 */
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const api = {
    getProducts: () => axios.get(`${API_URL}/products`, { withCredentials: true }),
    // Add other API calls here
};
