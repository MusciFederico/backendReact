// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios("http://localhost:8080/api/products", {
                    withCredentials: true
                });
                setProducts(response.data.response);
                setError(null);
            } catch (err) {
                console.log("err", err);
                setError(err.response?.data?.message || 'Failed to fetch products');
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, isLoading, error };
};