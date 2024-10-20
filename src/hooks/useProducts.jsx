// // src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { api } from '../services/api';

/**
 * Custom hook for managing product data fetching and state
 * @returns {Object} Product data state and loading/error states
 */
export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.getProducts();
                setProducts(response.data.response);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError(err.response?.data?.message || 'Failed to fetch products');
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Add methods to manipulate products if needed
    const refreshProducts = async () => {
        setIsLoading(true);
        try {
            const response = await api.getProducts();
            setProducts(response.data.response);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to refresh products');
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        products,
        isLoading,
        error,
        refreshProducts // Expose method to manually refresh products
    };
};