// src/screens/profile/TrackOrderScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TimelinePoint = ({ isCompleted, isActive, isLast }) => (
  <View style={styles.timelinePointContainer}>
    <View style={[
      styles.timelinePoint,
      isCompleted && styles.timelinePointCompleted,
      isActive && styles.timelinePointActive
    ]}>
      {isCompleted && <Ionicons name="checkmark" size={16} color="#fff" />}
    </View>
    {!isLast && (
      <View style={[
        styles.timelineLine,
        isCompleted && styles.timelineLineCompleted
      ]} />
    )}
  </View>
);

const TrackOrderScreen = ({ route, navigation }) => {
  const { order } = route.params;
  const [estimatedDelivery, setEstimatedDelivery] = useState('October 25, 2024');
  
  // Mock tracking data - replace with actual tracking data
  const trackingSteps = [
    {
      title: 'Order Placed',
      description: 'Your order has been confirmed',
      date: 'Oct 20, 2024',
      time: '10:30 AM',
      isCompleted: true,
      location: 'Online'
    },
    {
      title: 'Order Processed',
      description: 'Your order has been processed and packed',
      date: 'Oct 20, 2024',
      time: '2:45 PM',
      isCompleted: true,
      location: 'Logan, UT'
    },
    {
      title: 'In Transit',
      description: 'Your order is on the way',
      date: 'Oct 21, 2024',
      time: '9:15 AM',
      isCompleted: false,
      isActive: true,
      location: 'Salt Lake City, UT'
    },
    {
      title: 'Out for Delivery',
      description: 'Your order will be delivered today',
      date: '',
      time: '',
      isCompleted: false,
      location: ''
    },
    {
      title: 'Delivered',
      description: 'Your order has been delivered',
      date: '',
      time: '',
      isCompleted: false,
      location: ''
    }
  ];

  const handleContactSupport = () => {
    // Implement contact support functionality
    navigation.navigate('Support');
  };

  const handleViewDetails = () => {
    navigation.navigate('OrderDetails', { order });
  };

  const TrackingStep = ({ step, index, isLast }) => (
    <View style={styles.trackingStep}>
      <TimelinePoint 
        isCompleted={step.isCompleted}
        isActive={step.isActive}
        isLast={isLast}
      />
      <View style={styles.stepContent}>
        <View style={styles.stepHeader}>
          <Text style={[
            styles.stepTitle,
            (step.isCompleted || step.isActive) && styles.stepTitleActive
          ]}>
            {step.title}
          </Text>
          {(step.date && step.time) && (
            <Text style={styles.stepDateTime}>
              {step.date} at {step.time}
            </Text>
          )}
        </View>
        <Text style={styles.stepDescription}>{step.description}</Text>
        {step.location && (
          <Text style={styles.stepLocation}>
            <Ionicons name="location-outline" size={14} color="#666" />
            {' '}{step.location}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Order Info */}
        <View style={styles.orderInfo}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>Order #{order.id}</Text>
            <TouchableOpacity onPress={handleViewDetails}>
              <Text style={styles.viewDetails}>View Details</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.estimatedDelivery}>
            Estimated Delivery: {estimatedDelivery}
          </Text>
        </View>

        {/* Tracking Timeline */}
        <View style={styles.trackingContainer}>
          {trackingSteps.map((step, index) => (
            <TrackingStep
              key={index}
              step={step}
              index={index}
              isLast={index === trackingSteps.length - 1}
            />
          ))}
        </View>

        {/* Additional Information */}
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Ionicons name="cube-outline" size={24} color="#007AFF" />
              <Text style={styles.infoTitle}>Shipping Details</Text>
            </View>
            <Text style={styles.infoText}>
              Carrier: USPS{'\n'}
              Tracking Number: 1234567890{'\n'}
              Service: Standard Shipping
            </Text>
            <TouchableOpacity 
              style={styles.copyButton}
              onPress={() => {
                // Implement copy tracking number functionality
                Alert.alert('Copied', 'Tracking number copied to clipboard');
              }}
            >
              <Ionicons name="copy-outline" size={20} color="#007AFF" />
              <Text style={styles.copyButtonText}>Copy Tracking Number</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Ionicons name="navigate-outline" size={24} color="#007AFF" />
              <Text style={styles.infoTitle}>Delivery Address</Text>
            </View>
            <Text style={styles.infoText}>
              John Doe{'\n'}
              123 Main Street{'\n'}
              Logan, UT 84321{'\n'}
              United States
            </Text>
          </View>
        </View>

        {/* Support Section */}
        <TouchableOpacity 
          style={styles.supportButton}
          onPress={handleContactSupport}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#007AFF" />
          <Text style={styles.supportButtonText}>Need help with your order?</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  orderInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewDetails: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  estimatedDelivery: {
    fontSize: 14,
    color: '#666',
  },
  trackingContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  trackingStep: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  timelinePointContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  timelinePoint: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelinePointCompleted: {
    backgroundColor: '#34C759',
  },
  timelinePointActive: {
    backgroundColor: '#007AFF',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E5EA',
    position: 'absolute',
    top: 24,
    bottom: -30,
    left: 11,
  },
  timelineLineCompleted: {
    backgroundColor: '#34C759',
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
  },
  stepTitleActive: {
    color: '#333',
  },
  stepDateTime: {
    fontSize: 14,
    color: '#666',
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  stepLocation: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  copyButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  supportButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default TrackOrderScreen;