// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async ({ email, password, firstName, lastName }) => {
    try {
      setLoading(true);
      // TODO: Replace with actual Supabase signup
      console.log('Signing up:', { email, firstName, lastName });
      return true;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      setLoading(true);
      // TODO: Replace with actual Supabase signin
      console.log('Signing in:', { email });
      // Simulate successful login
      setUser({ 
        id: '1', 
        email,
        firstName: 'Test',
        lastName: 'User'
      });
      return true;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual Supabase signout
      setUser(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};