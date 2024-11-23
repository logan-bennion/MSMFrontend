// src/screens/profile/SupportScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SupportItem = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.supportItem} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={24} color="#007AFF" />
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.itemTitle}>{title}</Text>
      {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
    </View>
    <Ionicons name="chevron-forward" size={20} color="#666" />
  </TouchableOpacity>
);

const SupportScreen = () => {
  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@mainstreetmarkets.com');
  };

  const handlePhoneSupport = () => {
    Linking.openURL('tel:1-800-123-4567');
  };

  const handleFAQ = () => {
    // Navigate to FAQ screen or open web FAQ
    console.log('Open FAQ');
  };

  const handleChat = () => {
    // Open chat support
    console.log('Open chat support');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <SupportItem
            icon="mail-outline"
            title="Email Support"
            subtitle="support@mainstreetmarkets.com"
            onPress={handleEmailSupport}
          />
          <SupportItem
            icon="call-outline"
            title="Phone Support"
            subtitle="1-800-123-4567"
            onPress={handlePhoneSupport}
          />
          <SupportItem
            icon="chatbubble-outline"
            title="Live Chat"
            subtitle="Available 24/7"
            onPress={handleChat}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Self Help</Text>
          <SupportItem
            icon="help-circle-outline"
            title="FAQ"
            subtitle="Frequently Asked Questions"
            onPress={handleFAQ}
          />
          <SupportItem
            icon="document-text-outline"
            title="Shipping Information"
            onPress={() => {}}
          />
          <SupportItem
            icon="repeat-outline"
            title="Returns & Refunds"
            onPress={() => {}}
          />
          <SupportItem
            icon="shield-checkmark-outline"
            title="Buyer Protection"
            onPress={() => {}}
          />
        </View>

        <View style={styles.emergencyContainer}>
          <Text style={styles.emergencyTitle}>Need Urgent Help?</Text>
          <Text style={styles.emergencyText}>
            Our customer service team is available 24/7 to assist you with any urgent matters.
          </Text>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={handlePhoneSupport}
          >
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.emergencyButtonText}>Call Support Now</Text>
          </TouchableOpacity>
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
  section: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  emergencyContainer: {
    margin: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default SupportScreen;