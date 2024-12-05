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

  // Updated mock data to reflect local business services and products
  const orderDetails = {
    orderNumber: orderNumber,
    orderDate: 'Nov 24, 2024',
    status: 'Scheduled',
    orderType: 'service', // New field to distinguish between service and product orders
    items: [
      {
        id: 1,
        name: 'Holiday Window Painting Service',
        shopName: "Creative Corner Art Studio",
        price: 127.49,
        quantity: 1,
        image: 'https://example.com/image.jpg',
        serviceDate: 'Dec 15, 2024',
        serviceTime: '10:00 AM - 12:00 PM',
        specialInstructions: 'Winter theme with snowflakes and pine trees'
      }
    ],
    subtotal: 127.49,
    serviceFee: 10.00,
    tax: 11.02,
    total: 148.51,
    serviceLocation: {
      name: 'Main Street Boutique',
      businessType: 'Retail Store',
      street: '456 Main Street',
      city: 'Anytown',
      state: 'ST',
      zipCode: '12345',
      businessHours: '9:00 AM - 6:00 PM'
    },
    billingAddress: {
      name: 'Jane Smith',
      street: '456 Main Street',
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
    vendor: {
      name: 'Creative Corner Art Studio',
      phone: '(555) 123-4567',
      email: 'creative@mainstreetmarkets.com'
    }
  };

  const handleShare = async () => {
    try {
      const shareMessage = orderDetails.orderType === 'service' 
        ? `Service Booking - #${orderNumber}\nService: ${orderDetails.items[0].name}\nDate: ${orderDetails.items[0].serviceDate}\nTotal: $${orderDetails.total}`
        : `Order Details - #${orderNumber}\nTotal: $${orderDetails.total}`;
      
      await Share.share({
        message: shareMessage,
        title: 'Booking Details',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrackOrder = () => {
    navigation.navigate('OrderTracking', { orderNumber });
  };

  const handleContactVendor = () => {
    // Implement vendor contact functionality
    console.log('Contact vendor:', orderDetails.vendor);
  };

  const getStatusStyle = (status) => {
    const statusStyles = {
      'Scheduled': { backgroundColor: '#E3F2FD', color: '#1976D2' },
      'In Progress': { backgroundColor: '#FFF3E0', color: '#F57C00' },
      'Completed': { backgroundColor: '#E8F5E9', color: '#4CAF50' },
      'Cancelled': { backgroundColor: '#FFEBEE', color: '#D32F2F' }
    };
    return statusStyles[status] || statusStyles['Scheduled'];
  };

  const renderServiceDetails = (item) => (
    <View style={styles.serviceDetails}>
      <Text style={styles.serviceLabel}>Service Date:</Text>
      <Text style={styles.serviceValue}>{item.serviceDate}</Text>
      <Text style={styles.serviceLabel}>Service Time:</Text>
      <Text style={styles.serviceValue}>{item.serviceTime}</Text>
      {item.specialInstructions && (
        <>
          <Text style={styles.serviceLabel}>Special Instructions:</Text>
          <Text style={styles.serviceValue}>{item.specialInstructions}</Text>
        </>
      )}
    </View>
  );

  const renderLocationDetails = () => (
    <View style={styles.addressContainer}>
      <Text style={styles.addressTitle}>Service Location</Text>
      <Text style={styles.addressText}>{orderDetails.serviceLocation.name}</Text>
      <Text style={styles.addressText}>{orderDetails.serviceLocation.businessType}</Text>
      <Text style={styles.addressText}>{orderDetails.serviceLocation.street}</Text>
      <Text style={styles.addressText}>
        {orderDetails.serviceLocation.city}, {orderDetails.serviceLocation.state} {orderDetails.serviceLocation.zipCode}
      </Text>
      <Text style={styles.businessHours}>
        Business Hours: {orderDetails.serviceLocation.businessHours}
      </Text>
    </View>
  );

  const renderVendorDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Service Provider</Text>
      <View style={styles.vendorInfo}>
        <Ionicons name="business-outline" size={24} color="#666" />
        <View style={styles.vendorDetails}>
          <Text style={styles.vendorName}>{orderDetails.vendor.name}</Text>
          <Text style={styles.vendorContact}>{orderDetails.vendor.phone}</Text>
          <Text style={styles.vendorContact}>{orderDetails.vendor.email}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderNumber}>Booking #{orderNumber}</Text>
            <Text style={styles.orderDate}>Placed on {orderDetails.orderDate}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusStyle(orderDetails.status).backgroundColor }]}>
            <Text style={[styles.statusText, { color: getStatusStyle(orderDetails.status).color }]}>
              {orderDetails.status}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Details</Text>
          {orderDetails.items.map(item => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.itemImage}>
                <Ionicons name="calendar-outline" size={40} color="#666" />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemShop}>{item.shopName}</Text>
                <View style={styles.itemPriceRow}>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                </View>
                {renderServiceDetails(item)}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Service Total</Text>
            <Text style={styles.summaryValue}>${orderDetails.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Service Fee</Text>
            <Text style={styles.summaryValue}>${orderDetails.serviceFee.toFixed(2)}</Text>
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

        {renderLocationDetails()}
        {renderVendorDetails()}

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
          <TouchableOpacity style={styles.primaryButton} onPress={handleContactVendor}>
            <Ionicons name="call-outline" size={24} color="#fff" />
            <Text style={styles.primaryButtonText}>Contact Provider</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleTrackOrder}>
            <Ionicons name="calendar-outline" size={24} color="#2C5282" />
            <Text style={[styles.secondaryButtonText, { color: '#2C5282' }]}>View Schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

import { StyleSheet, Platform } from 'react-native';

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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
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
    color: '#2C5282',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  serviceDetails: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  serviceLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  serviceValue: {
    fontSize: 15,
    color: '#333',
    marginBottom: 5,
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
    color: '#2C5282',
  },
  addressContainer: {
    marginBottom: 20,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  businessHours: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  vendorInfo: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  vendorDetails: {
    marginLeft: 15,
    flex: 1,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  vendorContact: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
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
    backgroundColor: '#2C5282',
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
    color: '#2C5282',
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
  scheduledStatus: {
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
  },
  inProgressStatus: {
    backgroundColor: '#FFF3E0',
    color: '#F57C00',
  },
  completedStatus: {
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

export default styles;