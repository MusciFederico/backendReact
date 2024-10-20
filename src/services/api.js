// // // src/services/api.js
// /**
//  * API service module for handling all API calls.
//  * Centralizes API endpoint configuration and axios instance setup.
//  */
// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api';

// // Create axios instance with default config
// const axiosInstance = axios.create({
//     baseURL: API_URL,
//     withCredentials: true,
//     timeout: 10000, // 10 seconds
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// // Add response interceptor for error handling
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         // Log errors or handle them globally
//         console.error('API Error:', error);
//         return Promise.reject(error);
//     }
// );

// export const api = {
//     /**
//      * Fetch all products
//      * @returns {Promise} API response with products data
//      */
//     getProducts: () => axiosInstance.get('/products'),

//     /**
//      * Fetch single product by ID
//      * @param {string} id - Product ID
//      * @returns {Promise} API response with product data
//      */
//     getProductById: (id) => axiosInstance.get(`/products/${id}`),

//     /**
//      * Add additional API methods as needed
//      */
// };

/**
 * API service module for handling all API calls.
 * Centralizes API endpoint configuration and axios instance setup.
 */
import axios from 'axios';

const API_URL = 'http://localhost:8080/';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log errors or handle them globally
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export const api = {
    /**
     * Fetch all products
     * @returns {Promise} API response with products data
     */
    getProducts: () => axiosInstance.get('api/products'),

    /**
     * Fetch single product by ID
     * @param {string} id - Product ID
     * @returns {Promise} API response with product data
     */
    getProductById: (id) => axiosInstance.get(`api/products/${id}`),

    /**
     * Login user with credentials
     * @param {Object} credentials - User credentials
     * @param {string} credentials.email - User email
     * @param {string} credentials.password - User password
     * @returns {Promise} API response with user data
     */
    login: (credentials) => axiosInstance.post('/auth/login', credentials),

    /**
     * Logout user
     * @returns {Promise} API response
     */
    logout: () => axiosInstance.post('/auth/signout'),

    /**
     * Check authentication status
     * @returns {Promise} API response with user data if authenticated
     */
};