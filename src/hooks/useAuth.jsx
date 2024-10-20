import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

/**
 * Custom hook for managing authentication state and operations
 * @returns {Object} Authentication state and methods
 */
const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkAuthStatus = useCallback(async () => {
        try {
            const response = await api.checkAuth();
            setUser(response.data.user);
            setError(null);
        } catch (err) {
            setUser(null);
            setError(err.response?.data?.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const login = async (credentials) => {
        setIsLoading(true);
        try {
            const response = await api.login(credentials);
            setUser(response.data.user);
            setError(null);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await api.logout();
            setUser(null);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Logout failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        user,
        isLoading,
        error,
        login,
        logout,
        checkAuthStatus,
    };
};

export default useAuth;