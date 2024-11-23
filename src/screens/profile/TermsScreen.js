// src/screens/profile/TermsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionContent}>{children}</Text>
  </View>
);

const TermsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.lastUpdated}>Last Updated: November 20, 2024</Text>
        
        <Section title="1. Acceptance of Terms">
          By accessing and using Main Street Markets, including any mobile applications
          or web services, you agree to be bound by these Terms and Conditions.
          Please read these terms carefully before using our services.
        </Section>

        <Section title="2. User Accounts">
          You must create an account to use certain features of our service. You are
          responsible for maintaining the confidentiality of your account information
          and for all activities that occur under your account.
        </Section>

        <Section title="3. Shopping and Transactions">
          All purchases through our platform are subject to availability and product
          descriptions. We reserve the right to modify, terminate or refuse service
          to anyone at any time for any reason.
        </Section>

        <Section title="4. Shipping and Delivery">
          Shipping times and costs vary by location and delivery method. We are not
          responsible for delays caused by customs, weather, or other factors outside
          our control.
        </Section>

        <Section title="5. Returns and Refunds">
          Products may be returned within 30 days of delivery. Items must be unused
          and in original packaging. Some items may not be eligible for return.
        </Section>

        <Section title="6. Privacy Policy">
          Your use of our service is also governed by our Privacy Policy. Please
          review our Privacy Policy to understand our practices.
        </Section>

        <Section title="7. Intellectual Property">
          All content, designs, and interfaces on our platform are protected by
          copyright and other intellectual property rights owned by or licensed to us.
        </Section>

        <Section title="8. Limitation of Liability">
          We shall not be liable for any indirect, incidental, special, consequential,
          or punitive damages resulting from your use or inability to use our services.
        </Section>

        <Section title="9. Changes to Terms">
          We reserve the right to modify these terms at any time. Continued use of
          our service after changes constitutes acceptance of new terms.
        </Section>

        <Section title="10. Contact Information">
          For questions about these Terms and Conditions, please contact us at:
          legal@mainstreetmarkets.com
        </Section>

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

export default TermsScreen;