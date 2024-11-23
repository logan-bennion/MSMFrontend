// src/screens/profile/OrderHistoryScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OrderStatusBadge = ({ status }) => {
  const getStatusStyle = () => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return {
          container: { backgroundColor: '#E8F5E9' },
          text: { color: '#2E7D32' }
        };
      case 'processing':
        return {
          container: { backgroundColor: '#E3F2FD' },
          text: { color: '#1565C0' }
        };
      case 'cancelled':
        return {
          container: { backgroundColor: '#FFEBEE' },
          text: { color: '#C62828' }
        };
      default:
        return {
          container: { backgroundColor: '#F5F5F5' },
          text: { color: '#616161' }
        };
    }
  };

  const statusStyle = getStatusStyle();
  
  return (
    <View style={[styles.statusBadge, statusStyle.container]}>
      <Text style={[styles.statusText, statusStyle.text]}>{status}</Text>
    </View>
  );
};

const OrderCard = ({ order, onPressDetails, onTrackOrder, onLeaveReview }) => (
  <View style={styles.orderCard}>
    <View style={styles.orderHeader}>
      <View>
        <Text style={styles.orderId}>Order #{order.id}</Text>
        <Text style={styles.orderDate}>Placed on {order.date}</Text>
      </View>
      <OrderStatusBadge status={order.status} />
    </View>
    
    <View style={styles.orderItems}>
      {order.items.map((item, index) => (
        <View key={index} style={styles.orderItem}>
          <View style={styles.itemImage}>
            <Ionicons name="cube-outline" size={24} color="#666" />
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
          </View>
        </View>
      ))}
    </View>
    
    <View style={styles.orderFooter}>
      <Text style={styles.orderTotal}>Total: ${order.total.toFixed(2)}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => onPressDetails(order)}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
        {order.status === 'Delivered' && (
          <TouchableOpacity 
            style={styles.reviewButton}
            onPress={() => onLeaveReview(order)}
          >
            <Text style={styles.reviewButtonText}>Leave Review</Text>
          </TouchableOpacity>
        )}
        {order.status === 'Processing' && (
          <TouchableOpacity 
            style={styles.trackButton}
            onPress={() => onTrackOrder(order)}
          >
            <Text style={styles.trackButtonText}>Track Order</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  </View>
);

const OrderHistoryScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('All Orders');
  const [timeFilter, setTimeFilter] = useState('Last 6 months');
  
  // Mock data - replace with actual data from your backend
  const orders = [
    {
      id: '12345',
      date: 'Oct 15, 2024',
      status: 'Delivered',
      total: 99.99,
      items: [
        { name: 'Product Name', quantity: 1 }
      ]
    },
    {
      id: '12344',
      date: 'Oct 10, 2024',
      status: 'Processing',
      total: 159.98,
      items: [
        { name: 'Product Name', quantity: 2 }
      ]
    },
    {
      id: '12343',
      date: 'Oct 5, 2024',
      status: 'Cancelled',
      total: 79.99,
      items: [
        { name: 'Product Name', quantity: 1 }
      ]
    }
  ];

  const filters = ['All Orders', 'Delivered', 'Processing', 'Cancelled'];
  const timeFilters = ['Last 6 months', 'Last year', 'All time'];

  const handleOrderDetails = (order) => {
    navigation.navigate('OrderDetails', { order });
  };

  const handleTrackOrder = (order) => {
    navigation.navigate('TrackOrder', { order });
  };

  const handleLeaveReview = (order) => {
    navigation.navigate('LeaveReview', { order });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Time Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.timeFilterContainer}
        >
          {timeFilters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.timeFilterButton,
                timeFilter === filter && styles.timeFilterButtonActive
              ]}
              onPress={() => setTimeFilter(filter)}
            >
              <Text
                style={[
                  styles.timeFilterText,
                  timeFilter === filter && styles.timeFilterTextActive
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Status Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Orders List */}
        <View style={styles.ordersContainer}>
          {orders.map((order) => (
            <OrderCard
            key={order.id}
            order={order}
            onPressDetails={handleOrderDetails}
            onTrackOrder={handleTrackOrder}
            onLeaveReview={handleLeaveReview}
            />
          ))}
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
  timeFilterContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timeFilterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  timeFilterButtonActive: {
    backgroundColor: '#007AFF',
  },
  timeFilterText: {
    color: '#666',
    fontSize: 14,
  },
  timeFilterTextActive: {
    color: '#fff',
  },
  filterContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#fff',
  },
  ordersContainer: {
    padding: 15,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderItems: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemImage: {
    width: 40,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDetails: {
    marginLeft: 12,
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  itemQuantity: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
    marginTop: 5,
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  reviewButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  trackButton: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#1565C0',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OrderHistoryScreen;