// src/screens/profile/PrivacyScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionContent}>{children}</Text>
  </View>
);

const ContactButton = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.contactButton} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#007AFF" />
    <View style={styles.contactText}>
      <Text style={styles.contactTitle}>{title}</Text>
      <Text style={styles.contactSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#666" />
  </TouchableOpacity>
);

const PrivacyScreen = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:privacy@mainstreetmarkets.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.lastUpdated}>Last Updated: November 20, 2024</Text>
        
        <Section title="1. Information We Collect">
          We collect information that you provide directly to us, including name,
          email address, phone number, shipping address, and payment information.
          We also automatically collect certain information about your device and
          how you interact with our services.
        </Section>

        <Section title="2. How We Use Your Information">
          We use the information we collect to:
          {'\n'}- Process your orders and payments
          {'\n'}- Communicate with you about your orders
          {'\n'}- Send you marketing communications (with your consent)
          {'\n'}- Improve our services
          {'\n'}- Detect and prevent fraud
        </Section>

        <Section title="3. Information Sharing">
          We share your information with:
          {'\n'}- Service providers who assist our operations
          {'\n'}- Payment processors
          {'\n'}- Delivery partners
          {'\n'}- Law enforcement when required by law
        </Section>

        <Section title="4. Your Rights">
          You have the right to:
          {'\n'}- Access your personal information
          {'\n'}- Correct inaccurate information
          {'\n'}- Request deletion of your information
          {'\n'}- Opt-out of marketing communications
          {'\n'}- Export your data
        </Section>

        <Section title="5. Data Security">
          We implement appropriate technical and organizational measures to protect
          your personal information against unauthorized access, alteration,
          disclosure, or destruction.
        </Section>

        <Section title="6. Cookies and Tracking">
          We use cookies and similar tracking technologies to collect information
          about how you interact with our services and to improve your experience.
        </Section>

        <Section title="7. Children's Privacy">
          Our services are not directed to children under 13. We do not knowingly
          collect personal information from children under 13.
        </Section>

        <View style={styles.contactSection}>
          <Text style={styles.contactHeader}>Privacy Questions?</Text>
          <ContactButton
            icon="mail-outline"
            title="Email Our Privacy Team"
            subtitle="privacy@mainstreetmarkets.com"
            onPress={handleEmailPress}
          />
          <Text style={styles.contactDescription}>
            If you have any questions about our Privacy Policy or how we handle
            your information, please don't hesitate to contact our dedicated
            privacy team.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Main Street Markets. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 15,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
  },
  contactSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  contactHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
  },
  contactText: {
    flex: 1,
    marginLeft: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  contactDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    marginTop: 30,
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default PrivacyScreen;