// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { cartAPI } from '../services/api';

const CartContext = createContext();
//const CART_STORAGE_KEY = '@mainstreet_markets_cart';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
      try {
          setLoading(true);
          const cartData = await cartAPI.getCart();
          setCart(cartData);
          setError(null);
      } catch (err) {
          console.error('Error fetching cart:', err);
          setError('Failed to fetch cart');
          // Initialize empty cart for development
          setCart({ items: [], total: 0 });
      } finally {
          setLoading(false);
      }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
        setLoading(true);
        console.log('CartContext: Adding to cart:', { productId, quantity });
        const updatedCart = await cartAPI.addToCart(productId, quantity);
        setCart(updatedCart);
        setError(null);
        return true;
    } catch (err) {
        console.error('CartContext: Error adding to cart:', err);
        setError('Failed to add item to cart');
        Alert.alert(
            'Error',
            'Failed to add item to cart. Please try again.'
        );
        return false;
    } finally {
        setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
      try {
          setLoading(true);
          await cartAPI.removeFromCart(productId);
          await fetchCart(); // Refresh cart after removal
          setError(null);
          return true;
      } catch (err) {
          console.error('Error removing from cart:', err);
          setError('Failed to remove item from cart');
          return false;
      } finally {
          setLoading(false);
      }
  };

  const updateQuantity = async (productId, quantity) => {
      try {
          setLoading(true);
          const updatedCart = await cartAPI.updateQuantity(productId, quantity);
          setCart(updatedCart);
          setError(null);
          return true;
      } catch (err) {
          console.error('Error updating quantity:', err);
          setError('Failed to update quantity');
          return false;
      } finally {
          setLoading(false);
      }
  };

  // For development - clear any API errors and reset cart
  const clearError = () => {
      setError(null);
  };

  // For development - reset cart to empty state
  const clearCart = () => {
      setCart({ items: [], total: 0 });
  };

  return (
      <CartContext.Provider
          value={{
              cart,
              loading,
              error,
              addToCart,
              removeFromCart,
              updateQuantity,
              refreshCart: fetchCart,
              clearError,     // Development helper
              clearCart,      // Development helper
          }}
      >
          {children}
      </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

/*
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart data from AsyncStorage on initial mount
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  // Save cart data to AsyncStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      saveCartToStorage();
    }
  }, [cartItems]);

  const loadCartFromStorage = async () => {
    try {
      const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      Alert.alert('Error', 'Failed to load your cart items');
    } finally {
      setLoading(false);
    }
  };

  const saveCartToStorage = async () => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
      Alert.alert('Error', 'Failed to save your cart items');
    }
  };

  const addToCart = async (product, quantity = 1, selectedSize = null) => {
    try {
      setCartItems(currentItems => {
        // Check if item already exists in cart
        const existingItemIndex = currentItems.findIndex(
          item => item.id === product.id && item.selectedSize === selectedSize
        );

        if (existingItemIndex > -1) {
          // Update quantity if item exists
          const newItems = [...currentItems];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + quantity
          };
          return newItems;
        }

        // Add new item if it doesn't exist
        return [...currentItems, { 
          ...product, 
          quantity, 
          selectedSize,
          addedAt: new Date().toISOString() 
        }];
      });

      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'Failed to add item to cart');
      return false;
    }
  };

  const updateQuantity = async (productId, newQuantity, selectedSize = null) => {
    try {
      if (newQuantity < 1) {
        return removeFromCart(productId, selectedSize);
      }

      setCartItems(currentItems => {
        const newItems = [...currentItems];
        const itemIndex = newItems.findIndex(
          item => item.id === productId && item.selectedSize === selectedSize
        );

        if (itemIndex > -1) {
          newItems[itemIndex] = {
            ...newItems[itemIndex],
            quantity: newQuantity,
            updatedAt: new Date().toISOString()
          };
        }

        return newItems;
      });

      return true;
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert('Error', 'Failed to update item quantity');
      return false;
    }
  };

  const removeFromCart = async (productId, selectedSize = null) => {
    try {
      setCartItems(currentItems =>
        currentItems.filter(
          item => !(item.id === productId && item.selectedSize === selectedSize)
        )
      );
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      Alert.alert('Error', 'Failed to remove item from cart');
      return false;
    }
  };

  const clearCart = async () => {
    try {
      setCartItems([]);
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      Alert.alert('Error', 'Failed to clear cart');
      return false;
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
*/