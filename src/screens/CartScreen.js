// src/screens/CartScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { api } from '../services/api';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.getCart();
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      const cartItems = await getCart();
      const total = calculateTotal(cartItems);
      setLoading(true);
      const orderData = {
        cart_items: cartItems,
        total_amount: total,
        shipping_address: 'Default shipping address' // Replace with actual shipping address logic
      };
      
      const response = await api.createOrder(orderData);
      if (response.ok) {
        setCartItems([]);
        navigation.navigate('OrderConfirmation', { order: response.data });
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (cartItems) => {
    if (!Array.isArray(cartItems)) {
        console.error('cartItems is not an array:', cartItems);
        return 0; // Return 0 or handle the error as needed
    }
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ?
        <Text>Loading...</Text>
      : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <TouchableOpacity onPress={handleCheckout}>
            <Text style={styles.checkoutButton}>Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;