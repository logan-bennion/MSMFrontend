// src/context/WishlistContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const WishlistContext = createContext();
const WISHLIST_STORAGE_KEY = '@mainstreet_markets_wishlist';

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist from storage on app start
  useEffect(() => {
    loadWishlist();
  }, []);

  // Save wishlist whenever it changes
  useEffect(() => {
    if (!loading) {
      saveWishlist();
    }
  }, [wishlistItems]);

  const loadWishlist = async () => {
    try {
      const savedWishlist = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveWishlist = async () => {
    try {
      await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  };

  const addToWishlist = (product) => {
    setWishlistItems(currentItems => {
      if (!currentItems.some(item => item.id === product.id)) {
        Alert.alert('Added to Wishlist', 'Item has been added to your wishlist');
        return [...currentItems, { ...product, addedAt: new Date().toISOString() }];
      }
      Alert.alert('Already in Wishlist', 'This item is already in your wishlist');
      return currentItems;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(currentItems => 
      currentItems.filter(item => item.id !== productId)
    );
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = async () => {
    setWishlistItems([]);
    try {
      await AsyncStorage.removeItem(WISHLIST_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing wishlist:', error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};