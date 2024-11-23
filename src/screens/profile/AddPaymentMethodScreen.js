// src/screens/profile/AddPaymentMethodScreen.js
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

const AddPaymentMethodScreen = ({ navigation }) => {
  const { updatePaymentMethod } = useUser();
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});

  // Format card number with spaces
  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted;
  };

  // Format expiry date
  const formatExpiry = (type, text) => {
    const cleaned = text.replace(/\D/g, '');
    if (type === 'month' && cleaned.length > 0) {
      const month = parseInt(cleaned);
      if (month > 12) return '12';
      return cleaned;
    }
    return cleaned;
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Card Number (16 digits)
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    // Validate Card Holder
    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = 'Card holder name is required';
    }

    // Validate Expiry Month
    const month = parseInt(formData.expiryMonth);
    if (!month || month < 1 || month > 12) {
      newErrors.expiryMonth = 'Enter valid month (1-12)';
    }

    // Validate Expiry Year
    const currentYear = new Date().getFullYear() % 100;
    const year = parseInt(formData.expiryYear);
    if (!year || year < currentYear) {
      newErrors.expiryYear = 'Enter valid year';
    }

    // Validate CVV (3 or 4 digits)
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Enter valid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const paymentMethod = {
          cardNumber: formData.cardNumber.replace(/\s/g, ''),
          cardHolder: formData.cardHolder.toUpperCase(),
          expiryMonth: formData.expiryMonth.padStart(2, '0'),
          expiryYear: formData.expiryYear.padStart(2, '0'),
          type: getCardType(formData.cardNumber),
        };

        const success = await updatePaymentMethod(paymentMethod);
        if (success) {
          Alert.alert('Success', 'Payment method added successfully', [
            { text: 'OK', onPress: () => navigation.goBack() }
          ]);
        } else {
          Alert.alert('Error', 'Failed to add payment method');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while adding payment method');
      }
    }
  };

  const getCardType = (number) => {
    const firstDigit = number.charAt(0);
    const secondDigit = number.charAt(1);
    
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3' && (secondDigit === '4' || secondDigit === '7')) return 'Amex';
    if (firstDigit === '6') return 'Discover';
    return 'Unknown';
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.formContainer}>
            {/* Card Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Number</Text>
              <View style={[styles.inputContainer, errors.cardNumber && styles.inputError]}>
                <Ionicons name="card-outline" size={20} color="#666" />
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChangeText={(text) => {
                    const formatted = formatCardNumber(text);
                    if (formatted.length <= 19) { // 16 digits + 3 spaces
                      setFormData({ ...formData, cardNumber: formatted });
                      if (errors.cardNumber) {
                        setErrors({ ...errors, cardNumber: null });
                      }
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>
              {errors.cardNumber && (
                <Text style={styles.errorText}>{errors.cardNumber}</Text>
              )}
            </View>

            {/* Card Holder */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Holder Name</Text>
              <View style={[styles.inputContainer, errors.cardHolder && styles.inputError]}>
                <Ionicons name="person-outline" size={20} color="#666" />
                <TextInput
                  style={styles.input}
                  placeholder="JOHN DOE"
                  value={formData.cardHolder}
                  onChangeText={(text) => {
                    setFormData({ ...formData, cardHolder: text.toUpperCase() });
                    if (errors.cardHolder) {
                      setErrors({ ...errors, cardHolder: null });
                    }
                  }}
                  autoCapitalize="characters"
                />
              </View>
              {errors.cardHolder && (
                <Text style={styles.errorText}>{errors.cardHolder}</Text>
              )}
            </View>

            {/* Expiry and CVV Row */}
            <View style={styles.row}>
              {/* Expiry Month */}
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Month</Text>
                <View style={[styles.inputContainer, errors.expiryMonth && styles.inputError]}>
                  <TextInput
                    style={styles.input}
                    placeholder="MM"
                    value={formData.expiryMonth}
                    onChangeText={(text) => {
                      const formatted = formatExpiry('month', text);
                      if (formatted.length <= 2) {
                        setFormData({ ...formData, expiryMonth: formatted });
                        if (errors.expiryMonth) {
                          setErrors({ ...errors, expiryMonth: null });
                        }
                      }
                    }}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </View>
                {errors.expiryMonth && (
                  <Text style={styles.errorText}>{errors.expiryMonth}</Text>
                )}
              </View>

              {/* Expiry Year */}
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>Year</Text>
                <View style={[styles.inputContainer, errors.expiryYear && styles.inputError]}>
                  <TextInput
                    style={styles.input}
                    placeholder="YY"
                    value={formData.expiryYear}
                    onChangeText={(text) => {
                      const formatted = formatExpiry('year', text);
                      if (formatted.length <= 2) {
                        setFormData({ ...formData, expiryYear: formatted });
                        if (errors.expiryYear) {
                          setErrors({ ...errors, expiryYear: null });
                        }
                      }
                    }}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </View>
                {errors.expiryYear && (
                  <Text style={styles.errorText}>{errors.expiryYear}</Text>
                )}
              </View>

              {/* CVV */}
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>CVV</Text>
                <View style={[styles.inputContainer, errors.cvv && styles.inputError]}>
                  <TextInput
                    style={styles.input}
                    placeholder="123"
                    value={formData.cvv}
                    onChangeText={(text) => {
                      const cleaned = text.replace(/\D/g, '');
                      if (cleaned.length <= 4) {
                        setFormData({ ...formData, cvv: cleaned });
                        if (errors.cvv) {
                          setErrors({ ...errors, cvv: null });
                        }
                      }
                    }}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
                {errors.cvv && (
                  <Text style={styles.errorText}>{errors.cvv}</Text>
                )}
              </View>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.addButtonText}>Add Payment Method</Text>
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
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddPaymentMethodScreen;