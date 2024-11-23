// src/screens/OrderTrackingScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TRACKING_STATUSES = {
  ORDERED: {
    title: 'Order Placed',
    description: 'Your order has been confirmed',
    icon: 'receipt-outline',
  },
  PROCESSING: {
    title: 'Processing',
    description: 'Your order is being processed',
    icon: 'cube-outline',
  },
  SHIPPED: {
    title: 'Shipped',
    description: 'Your order is on the way',
    icon: 'car-outline',
  },
  DELIVERED: {
    title: 'Delivered',
    description: 'Your order has been delivered',
    icon: 'checkmark-circle-outline',
  },
};

const TrackingStep = ({ status, title, description, isCompleted, isActive, isLast }) => {
  const lineHeight = new Animated.Value(0);

  useEffect(() => {
    if (isCompleted) {
      Animated.timing(lineHeight, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isCompleted]);

  return (
    <View style={styles.trackingStep}>
      <View style={styles.stepIconContainer}>
        <View style={[
          styles.stepIcon,
          isCompleted && styles.completedStepIcon,
          isActive && styles.activeStepIcon,
        ]}>
          <Ionicons
            name={TRACKING_STATUSES[status].icon}
            size={24}
            color={isCompleted || isActive ? '#fff' : '#666'}
          />
        </View>
        {!isLast && (
          <Animated.View
            style={[
              styles.stepLine,
              {
                backgroundColor: isCompleted ? '#4CD964' : '#ddd',
                height: lineHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        )}
      </View>
      <View style={styles.stepContent}>
        <Text style={[
          styles.stepTitle,
          (isCompleted || isActive) && styles.activeStepTitle,
        ]}>
          {title}
        </Text>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
    </View>
  );
};

const OrderTrackingScreen = ({ route }) => {
  const { orderNumber } = route.params;
  const [currentStatus, setCurrentStatus] = useState('PROCESSING');

  // Mock tracking data - replace with real API call
  const trackingData = {
    orderNumber: orderNumber,
    status: currentStatus,
    estimatedDelivery: 'Dec 15, 2024',
    carrier: 'Local Express',
    trackingNumber: 'LE123456789',
    updatedAt: new Date().toLocaleString(),
  };

  const getStatusIndex = (status) => {
    return Object.keys(TRACKING_STATUSES).indexOf(status);
  };

  const isStatusCompleted = (status) => {
    return getStatusIndex(status) < getStatusIndex(currentStatus);
  };

  const isStatusActive = (status) => {
    return status === currentStatus;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.orderNumber}>Order #{orderNumber}</Text>
          <Text style={styles.estimatedDelivery}>
            Estimated Delivery: {trackingData.estimatedDelivery}
          </Text>
        </View>

        <View style={styles.trackingContainer}>
          {Object.entries(TRACKING_STATUSES).map(([status, info], index, arr) => (
            <TrackingStep
              key={status}
              status={status}
              title={info.title}
              description={info.description}
              isCompleted={isStatusCompleted(status)}
              isActive={isStatusActive(status)}
              isLast={index === arr.length - 1}
            />
          ))}
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Carrier</Text>
            <Text style={styles.detailValue}>{trackingData.carrier}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tracking Number</Text>
            <Text style={styles.detailValue}>{trackingData.trackingNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Updated</Text>
            <Text style={styles.detailValue}>{trackingData.updatedAt}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.carrierButton}>
          <Text style={styles.carrierButtonText}>View on Carrier's Website</Text>
        </TouchableOpacity>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  estimatedDelivery: {
    fontSize: 16,
    color: '#666',
  },
  trackingContainer: {
    padding: 20,
  },
  trackingStep: {
    flexDirection: 'row',
    minHeight: 100,
  },
  stepIconContainer: {
    alignItems: 'center',
    width: 40,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  completedStepIcon: {
    backgroundColor: '#4CD964',
  },
  activeStepIcon: {
    backgroundColor: '#007AFF',
  },
  stepLine: {
    width: 2,
    position: 'absolute',
    top: 40,
    left: 19,
    bottom: 0,
  },
  stepContent: {
    flex: 1,
    paddingLeft: 20,
    paddingBottom: 30,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#666',
  },
  activeStepTitle: {
    color: '#333',
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  carrierButton: {
    marginHorizontal: 20,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  carrierButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderTrackingScreen;