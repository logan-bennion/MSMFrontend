// src/screens/profile/PaymentMethodsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';

const PaymentMethodCard = ({ method, isDefault, onEdit, onDelete, onSetDefault }) => {
  // Function to mask card number
  const maskCardNumber = (number) => {
    return `•••• •••• •••• ${number.slice(-4)}`;
  };

  // Function to get card icon based on type
  const getCardIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'visa':
        return 'card-outline';
      case 'mastercard':
        return 'card-outline';
      case 'amex':
        return 'card-outline';
      default:
        return 'card-outline';
    }
  };

  return (
    <View style={styles.paymentCard}>
      {isDefault && (
        <View style={styles.defaultBadge}>
          <Text style={styles.defaultBadgeText}>Default</Text>
        </View>
      )}
      
      <View style={styles.cardHeader}>
        <View style={styles.cardTypeContainer}>
          <Ionicons 
            name={getCardIcon(method.type)} 
            size={24} 
            color="#007AFF" 
          />
          <Text style={styles.cardType}>{method.type}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onEdit(method)}
          >
            <Ionicons name="create-outline" size={20} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onDelete(method)}
          >
            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.cardNumber}>
        {maskCardNumber(method.cardNumber)}
      </Text>
      <Text style={styles.cardHolder}>{method.cardHolder}</Text>
      <Text style={styles.expiryDate}>Expires {method.expiryMonth}/{method.expiryYear}</Text>

      {!isDefault && (
        <TouchableOpacity
          style={styles.setDefaultButton}
          onPress={() => onSetDefault(method)}
        >
          <Text style={styles.setDefaultButtonText}>Set as Default</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const PaymentMethodsScreen = ({ navigation }) => {
  const { user, updatePaymentMethod } = useUser();
  
  // Mock payment methods - replace with actual data from your user context
  const [paymentMethods] = useState([
    {
      id: '1',
      type: 'Visa',
      cardNumber: '4111111111111111',
      cardHolder: 'RIFAT IBN ALAM',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: true
    },
    {
      id: '2',
      type: 'Mastercard',
      cardNumber: '5555555555554444',
      cardHolder: 'RIFAT IBN ALAM',
      expiryMonth: '06',
      expiryYear: '24',
      isDefault: false
    }
  ]);

  const handleEditPaymentMethod = (method) => {
    navigation.navigate('EditPaymentMethod', { method });
  };

  const handleDeletePaymentMethod = (method) => {
    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Implement delete logic
            console.log('Delete payment method:', method.id);
          }
        }
      ]
    );
  };

  const handleSetDefaultPaymentMethod = (method) => {
    Alert.alert(
      'Set Default Payment Method',
      'Make this your default payment method?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Set Default',
          onPress: () => {
            // Implement set default logic
            console.log('Set default payment method:', method.id);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            isDefault={method.isDefault}
            onEdit={handleEditPaymentMethod}
            onDelete={handleDeletePaymentMethod}
            onSetDefault={handleSetDefaultPaymentMethod}
          />
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddPaymentMethod')}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add New Payment Method</Text>
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
  scrollContent: {
    padding: 15,
  },
  paymentCard: {
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
  defaultBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultBadgeText: {
    color: '#1565C0',
    fontSize: 12,
    fontWeight: '600',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  cardNumber: {
    fontSize: 18,
    color: '#333',
    letterSpacing: 1,
    marginBottom: 12,
  },
  cardHolder: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  expiryDate: {
    fontSize: 14,
    color: '#666',
  },
  setDefaultButton: {
    marginTop: 12,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
  },
  setDefaultButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 12,
    marginTop: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default PaymentMethodsScreen;