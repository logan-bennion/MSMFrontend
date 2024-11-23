// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();
const USER_STORAGE_KEY = '@mainstreet_markets_user';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData) => {
    try {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  };

  const updateShippingAddress = async (address) => {
    try {
      const updatedUser = {
        ...user,
        shippingAddresses: [
          ...(user?.shippingAddresses || []),
          { id: Date.now(), ...address }
        ]
      };
      setUser(updatedUser);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Error updating shipping address:', error);
      return false;
    }
  };

  const updatePaymentMethod = async (paymentMethod) => {
    try {
      const updatedUser = {
        ...user,
        paymentMethods: [
          ...(user?.paymentMethods || []),
          { id: Date.now(), ...paymentMethod }
        ]
      };
      setUser(updatedUser);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Error updating payment method:', error);
      return false;
    }
  };

  const updateNotificationSettings = async (settings) => {
    try {
      const updatedUser = {
        ...user,
        notificationSettings: {
          ...(user?.notificationSettings || {}),
          ...settings
        }
      };
      setUser(updatedUser);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Error updating notification settings:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      loading,
      updateUser,
      updateShippingAddress,
      updatePaymentMethod,
      updateNotificationSettings,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};