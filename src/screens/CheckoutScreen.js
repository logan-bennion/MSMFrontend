// src/screens/CheckoutScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useCart } from '../context/CartContext';

const CheckoutSteps = {
  SHIPPING: 'shipping',
  PAYMENT: 'payment',
  REVIEW: 'review',
};

const CheckoutScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(CheckoutSteps.SHIPPING);
  const { cartItems, getCartTotal } = useCart();

  const renderStep = () => {
    switch (currentStep) {
      case CheckoutSteps.SHIPPING:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Shipping Information</Text>
            {/* Add shipping form components here */}
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => setCurrentStep(CheckoutSteps.PAYMENT)}
            >
              <Text style={styles.continueButtonText}>Continue to Payment</Text>
            </TouchableOpacity>
          </View>
        );
      
      case CheckoutSteps.PAYMENT:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Payment Method</Text>
            {/* Add payment form components here */}
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => setCurrentStep(CheckoutSteps.REVIEW)}
            >
              <Text style={styles.continueButtonText}>Review Order</Text>
            </TouchableOpacity>
          </View>
        );
      
      case CheckoutSteps.REVIEW:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Order Review</Text>
            {/* Add order summary components here */}
            <TouchableOpacity 
              style={styles.placeOrderButton}
              onPress={handlePlaceOrder}
            >
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  const handlePlaceOrder = () => {
    // Implement order placement logic
    Alert.alert(
      "Order Placed",
      "Thank you for your order!",
      [
        {
          text: "OK",
          onPress: () => {
            // Clear cart and navigate to home
            navigation.navigate('Home');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <View style={styles.progressBar}>
        {Object.values(CheckoutSteps).map((step, index) => (
          <View key={step} style={styles.progressStep}>
            <View style={[
              styles.progressDot,
              currentStep === step && styles.activeProgressDot,
              Object.values(CheckoutSteps).indexOf(currentStep) > index && styles.completedProgressDot,
            ]} />
            <Text style={[
              styles.progressText,
              currentStep === step && styles.activeProgressText,
            ]}>
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </Text>
          </View>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {renderStep()}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>${getCartTotal().toFixed(2)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  progressDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ddd',
    marginBottom: 5,
  },
  activeProgressDot: {
    backgroundColor: '#007AFF',
  },
  completedProgressDot: {
    backgroundColor: '#4CD964',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  activeProgressText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  placeOrderButton: {
    backgroundColor: '#4CD964',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;