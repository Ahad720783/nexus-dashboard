import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth session from storage/mock
  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await authService.getCurrentUser();
        if (session && session.user) {
          setUser(session.user);
          setToken(session.token);
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      setToken(response.token);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setToken(response.token);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginGuest = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await authService.loginGuest();
      setUser(response.user);
      setToken(response.token);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    const updated = await authService.updateProfile(profileData);
    setUser(updated);
    return updated;
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!user && !user.isGuest,
    isGuest: !!user?.isGuest,
    isLoading,
    login,
    loginGuest,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
