// src/screens/profile/ShippingAddressesScreen.js
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

const AddressCard = ({ address, isDefault, onEdit, onDelete, onSetDefault }) => (
  <View style={styles.addressCard}>
    {isDefault && (
      <View style={styles.defaultBadge}>
        <Text style={styles.defaultBadgeText}>Default</Text>
      </View>
    )}
    
    <View style={styles.addressHeader}>
      <Text style={styles.addressName}>{address.name}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onEdit(address)}
        >
          <Ionicons name="create-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onDelete(address)}
        >
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>

    <Text style={styles.addressText}>{address.street}</Text>
    <Text style={styles.addressText}>
      {address.city}, {address.state} {address.zipCode}
    </Text>
    <Text style={styles.addressText}>{address.country}</Text>
    <Text style={styles.phoneText}>{address.phone}</Text>

    {!isDefault && (
      <TouchableOpacity
        style={styles.setDefaultButton}
        onPress={() => onSetDefault(address)}
      >
        <Text style={styles.setDefaultButtonText}>Set as Default</Text>
      </TouchableOpacity>
    )}
  </View>
);

const ShippingAddressesScreen = ({ navigation }) => {
  const { user, updateShippingAddress } = useUser();
  
  // Mock addresses - replace with actual data from your user context
  const [addresses] = useState([
    {
      id: '1',
      name: 'Home',
      street: '123 Main St',
      city: 'Logan',
      state: 'UT',
      zipCode: '84321',
      country: 'United States',
      phone: '+1 (435) 123-4567',
      isDefault: true
    },
    {
      id: '2',
      name: 'Work',
      street: '456 Office Ave',
      city: 'Logan',
      state: 'UT',
      zipCode: '84322',
      country: 'United States',
      phone: '+1 (435) 987-6543',
      isDefault: false
    }
  ]);

  const handleEditAddress = (address) => {
    navigation.navigate('EditAddress', { address });
  };

  const handleDeleteAddress = (address) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
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
            console.log('Delete address:', address.id);
          }
        }
      ]
    );
  };

  const handleSetDefaultAddress = (address) => {
    Alert.alert(
      'Set Default Address',
      'Make this your default shipping address?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Set Default',
          onPress: () => {
            // Implement set default logic
            console.log('Set default address:', address.id);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            isDefault={address.isDefault}
            onEdit={handleEditAddress}
            onDelete={handleDeleteAddress}
            onSetDefault={handleSetDefaultAddress}
          />
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddAddress')}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add New Address</Text>
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
  addressCard: {
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
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressName: {
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
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  phoneText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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

export default ShippingAddressesScreen;