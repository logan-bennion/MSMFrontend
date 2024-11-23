// src/screens/profile/AddShippingAddressScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';

const AddShippingAddressScreen = ({ navigation }) => {
  const { user, updateShippingAddress } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States', // Default country
    phone: user?.phone || '', // Pre-fill with user's phone if available
    isDefault: false
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Address name is required';
    }

    if (!formData.street.trim()) {
      newErrors.street = 'Street address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Enter a valid ZIP code';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // If it's the first address, automatically set it as default
        const isFirstAddress = !user?.shippingAddresses?.length;
        const addressData = {
          ...formData,
          isDefault: isFirstAddress || formData.isDefault
        };

        const success = await updateShippingAddress(addressData);

        if (success) {
          Alert.alert(
            'Success',
            'Shipping address added successfully',
            [{ text: 'OK', onPress: () => navigation.goBack() }]
          );
        } else {
          Alert.alert('Error', 'Failed to add shipping address');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while adding the address');
      }
    }
  };

  const formatPhoneNumber = (text) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (cleaned.length >= 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length >= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length >= 3) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    }
    return cleaned;
  };

  const renderInput = (label, field, placeholder, keyboardType = 'default', optional = false) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label} {!optional && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={[styles.inputContainer, errors[field] && styles.inputError]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={formData[field]}
          onChangeText={(text) => {
            let formattedText = text;
            if (field === 'phone') {
              formattedText = formatPhoneNumber(text);
            }
            setFormData({ ...formData, [field]: formattedText });
            if (errors[field]) {
              setErrors({ ...errors, [field]: null });
            }
          }}
          keyboardType={keyboardType}
        />
      </View>
      {errors[field] && (
        <Text style={styles.errorText}>{errors[field]}</Text>
      )}
    </View>
  );

  const renderInfoText = (text) => (
    <View style={styles.infoContainer}>
      <Ionicons name="information-circle-outline" size={20} color="#666" />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.formContainer}>
            {renderInput('Address Name', 'name', 'e.g., Home, Office')}
            {renderInfoText('This helps you identify this address later')}

            {renderInput('Street Address', 'street', 'Street address')}
            {renderInput('Apartment, Suite, etc.', 'apartment', 'Apt, Suite, Floor (optional)', 'default', true)}
            {renderInput('City', 'city', 'City')}
            {renderInput('State/Province', 'state', 'State')}
            {renderInput('ZIP/Postal Code', 'zipCode', '12345', 'numeric')}
            {renderInput('Country', 'country', 'Country')}
            {renderInput('Phone Number', 'phone', '(123) 456-7890', 'phone-pad')}
            {renderInfoText('For delivery updates and coordination')}

            <View style={styles.defaultContainer}>
              <TouchableOpacity
                style={styles.defaultButton}
                onPress={() => setFormData({ ...formData, isDefault: !formData.isDefault })}
              >
                <View style={[styles.checkbox, formData.isDefault && styles.checkboxChecked]}>
                  {formData.isDefault && <Ionicons name="checkmark" size={16} color="#fff" />}
                </View>
                <Text style={styles.defaultText}>Set as default shipping address</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveButtonText}>Add Address</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  required: {
    color: '#FF3B30',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    height: 48,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  defaultContainer: {
    marginVertical: 20,
  },
  defaultButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  defaultText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddShippingAddressScreen;