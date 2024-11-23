// src/screens/profile/OrderDetailsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatusBar = ({ status }) => {
  const getStatusInfo = () => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return {
          icon: 'checkmark-circle',
          color: '#34C759',
          backgroundColor: '#E8F5E9'
        };
      case 'processing':
        return {
          icon: 'time',
          color: '#007AFF',
          backgroundColor: '#E3F2FD'
        };
      case 'cancelled':
        return {
          icon: 'close-circle',
          color: '#FF3B30',
          backgroundColor: '#FFEBEE'
        };
      default:
        return {
          icon: 'ellipse',
          color: '#666',
          backgroundColor: '#F5F5F5'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <View style={[styles.statusBar, { backgroundColor: statusInfo.backgroundColor }]}>
      <Ionicons name={statusInfo.icon} size={24} color={statusInfo.color} />
      <Text style={[styles.statusText, { color: statusInfo.color }]}>{status}</Text>
    </View>
  );
};

const OrderDetailsScreen = ({ route, navigation }) => {
  const { order } = route.params;

  // Mock data - replace with actual order details
  const orderDetails = {
    id: order.id,
    date: order.date,
    status: order.status,
    items: [
      {
        id: '1',
        name: 'Product Name 1',
        description: 'Product description goes here',
        price: 49.99,
        quantity: 2,
        image: null // Add actual image URL
      },
      {
        id: '2',
        name: 'Product Name 2',
        description: 'Product description goes here',
        price: 29.99,
        quantity: 1,
        image: null // Add actual image URL
      }
    ],
    shipping: {
      method: 'Standard Shipping',
      address: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'Logan',
        state: 'UT',
        zipCode: '84321',
        country: 'United States'
      },
      cost: 5.99
    },
    payment: {
      method: 'Visa',
      last4: '1234'
    },
    subtotal: 129.97,
    tax: 10.40,
    total: 146.36
  };

  const handleTrackOrder = () => {
    navigation.navigate('TrackOrder', { orderId: orderDetails.id });
  };

  const handleLeaveReview = () => {
    navigation.navigate('LeaveReview', { orderId: orderDetails.id });
  };

  const renderOrderItem = (item) => (
    <View key={item.id} style={styles.orderItem}>
      <View style={styles.itemImage}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.productImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="cube-outline" size={30} color="#666" />
          </View>
        )}
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.itemPricing}>
          <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
          <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Order Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.orderId}>Order #{orderDetails.id}</Text>
            <Text style={styles.orderDate}>Placed on {orderDetails.date}</Text>
          </View>
          <StatusBar status={orderDetails.status} />
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {orderDetails.items.map(renderOrderItem)}
        </View>

        {/* Shipping Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Information</Text>
          <View style={styles.infoBlock}>
            <Text style={styles.shippingMethod}>{orderDetails.shipping.method}</Text>
            <Text style={styles.addressName}>{orderDetails.shipping.address.name}</Text>
            <Text style={styles.addressText}>{orderDetails.shipping.address.street}</Text>
            <Text style={styles.addressText}>
              {orderDetails.shipping.address.city}, {orderDetails.shipping.address.state} {orderDetails.shipping.address.zipCode}
            </Text>
            <Text style={styles.addressText}>{orderDetails.shipping.address.country}</Text>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <View style={styles.infoBlock}>
            <View style={styles.paymentMethod}>
              <Ionicons name="card-outline" size={24} color="#007AFF" />
              <Text style={styles.paymentText}>
                {orderDetails.payment.method} ending in {orderDetails.payment.last4}
              </Text>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryBlock}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${orderDetails.subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>${orderDetails.shipping.cost.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>${orderDetails.tax.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${orderDetails.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {orderDetails.status === 'Processing' && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.primaryButton]}
              onPress={handleTrackOrder}
            >
              <Ionicons name="navigate" size={20} color="#fff" />
              <Text style={styles.primaryButtonText}>Track Order</Text>
            </TouchableOpacity>
          )}
          {orderDetails.status === 'Delivered' && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={handleLeaveReview}
            >
              <Ionicons name="star-outline" size={20} color="#007AFF" />
              <Text style={styles.secondaryButtonText}>Leave Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderId: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemPricing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  infoBlock: {
    padding: 15,
  },
  shippingMethod: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  summaryBlock: {
    padding: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  actions: {
    padding: 20,
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default OrderDetailsScreen;