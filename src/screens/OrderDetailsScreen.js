// src/screens/OrderDetailsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OrderDetailsScreen = ({ route, navigation }) => {
  const { orderNumber } = route.params;

  // Mock order data - replace with real data
  const orderDetails = {
    orderNumber: orderNumber,
    orderDate: 'Nov 10, 2024',
    status: 'Processing',
    items: [
      {
        id: 1,
        name: 'Wireless Earbuds',
        shopName: "Bob's Electronics",
        price: 79.99,
        quantity: 1,
        image: 'https://example.com/image.jpg',
      },
      // Add more items
    ],
    subtotal: 79.99,
    shipping: 5.99,
    tax: 6.40,
    total: 92.38,
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'Anytown',
      state: 'ST',
      zipCode: '12345',
      country: 'United States',
    },
    billingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'Anytown',
      state: 'ST',
      zipCode: '12345',
      country: 'United States',
    },
    paymentMethod: {
      type: 'Credit Card',
      last4: '1234',
      brand: 'Visa',
    },
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Order Details - #${orderNumber}\nTotal: $${orderDetails.total}`,
        title: 'Order Details',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrackOrder = () => {
    navigation.navigate('OrderTracking', { orderNumber });
  };

  const handleContactSupport = () => {
    // Implement support contact functionality
  };

  const renderAddress = (title, address) => (
    <View style={styles.addressContainer}>
      <Text style={styles.addressTitle}>{title}</Text>
      <Text style={styles.addressText}>{address.name}</Text>
      <Text style={styles.addressText}>{address.street}</Text>
      <Text style={styles.addressText}>
        {address.city}, {address.state} {address.zipCode}
      </Text>
      <Text style={styles.addressText}>{address.country}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderNumber}>Order #{orderNumber}</Text>
            <Text style={styles.orderDate}>Placed on {orderDetails.orderDate}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{orderDetails.status}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          {orderDetails.items.map(item => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.itemImage}>
                <Ionicons name="image-outline" size={40} color="#666" />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemShop}>{item.shopName}</Text>
                <View style={styles.itemPriceRow}>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${orderDetails.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>${orderDetails.shipping.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${orderDetails.tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryItem, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${orderDetails.total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          {renderAddress('Shipping Address', orderDetails.shippingAddress)}
          {renderAddress('Billing Address', orderDetails.billingAddress)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethod}>
            <Ionicons name="card-outline" size={24} color="#666" />
            <Text style={styles.paymentText}>
              {orderDetails.paymentMethod.brand} ending in {orderDetails.paymentMethod.last4}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleTrackOrder}>
            <Ionicons name="location-outline" size={24} color="#fff" />
            <Text style={styles.primaryButtonText}>Track Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleContactSupport}>
            <Ionicons name="chatbubble-outline" size={24} color="#007AFF" />
            <Text style={styles.secondaryButtonText}>Contact Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    orderInfo: {
      flex: 1,
    },
    orderNumber: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 5,
    },
    orderDate: {
      fontSize: 14,
      color: '#666',
    },
    statusBadge: {
      backgroundColor: '#E8F5E9',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
    },
    statusText: {
      color: '#4CAF50',
      fontSize: 14,
      fontWeight: '600',
    },
    section: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 15,
    },
    orderItem: {
      flexDirection: 'row',
      marginBottom: 15,
    },
    itemImage: {
      width: 80,
      height: 80,
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    itemDetails: {
      flex: 1,
      justifyContent: 'center',
    },
    itemName: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 4,
    },
    itemShop: {
      fontSize: 14,
      color: '#666',
      marginBottom: 4,
    },
    itemPriceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: '600',
      color: '#007AFF',
    },
    itemQuantity: {
      fontSize: 14,
      color: '#666',
    },
    summaryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    summaryLabel: {
      fontSize: 16,
      color: '#666',
    },
    summaryValue: {
      fontSize: 16,
      color: '#333',
    },
    totalRow: {
      borderTopWidth: 1,
      borderTopColor: '#eee',
      marginTop: 10,
      paddingTop: 10,
    },
    totalLabel: {
      fontSize: 18,
      fontWeight: '600',
    },
    totalValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#007AFF',
    },
    addressContainer: {
      marginBottom: 20,
    },
    addressTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 10,
    },
    addressText: {
      fontSize: 15,
      color: '#333',
      lineHeight: 22,
    },
    paymentMethod: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
      padding: 15,
      borderRadius: 10,
    },
    paymentText: {
      fontSize: 16,
      marginLeft: 10,
      color: '#333',
    },
    actions: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    primaryButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#007AFF',
      padding: 15,
      borderRadius: 10,
      gap: 8,
    },
    primaryButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    secondaryButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
      padding: 15,
      borderRadius: 10,
      gap: 8,
    },
    secondaryButtonText: {
      color: '#007AFF',
      fontSize: 16,
      fontWeight: '600',
    },
    iconButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
    },
    // Status-specific styles
    processingStatus: {
      backgroundColor: '#E3F2FD',
      color: '#1976D2',
    },
    shippedStatus: {
      backgroundColor: '#FFF3E0',
      color: '#F57C00',
    },
    deliveredStatus: {
      backgroundColor: '#E8F5E9',
      color: '#4CAF50',
    },
    cancelledStatus: {
      backgroundColor: '#FFEBEE',
      color: '#D32F2F',
    },
    // Platform specific shadows
    ...Platform.select({
      ios: {
        shadowContainer: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
      },
      android: {
        shadowContainer: {
          elevation: 3,
        },
      },
    }),
  });
  
  export default OrderDetailsScreen;