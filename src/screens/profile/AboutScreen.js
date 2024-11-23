// src/screens/profile/AboutScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SocialButton = ({ icon, platform, handle, url }) => (
  <TouchableOpacity 
    style={styles.socialButton}
    onPress={() => Linking.openURL(url)}
  >
    <Ionicons name={icon} size={24} color="#007AFF" />
    <View style={styles.socialText}>
      <Text style={styles.socialPlatform}>{platform}</Text>
      <Text style={styles.socialHandle}>{handle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#666" />
  </TouchableOpacity>
);

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="storefront-outline" size={60} color="#007AFF" />
          </View>
          <Text style={styles.appName}>Main Street Markets</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionContent}>
            Main Street Markets is dedicated to empowering local businesses and
            connecting communities through a seamless digital marketplace. We strive
            to make shopping local as convenient as possible while supporting small
            businesses and entrepreneurs.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <InfoRow label="Released" value="November 2024" />
          <InfoRow label="Last Updated" value="November 20, 2024" />
          <InfoRow label="Developer" value="Main Street Markets Team" />
          <InfoRow label="Platform" value="iOS & Android" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connect With Us</Text>
          <SocialButton
            icon="logo-twitter"
            platform="Twitter"
            handle="@mainstreetmarkets"
            url="https://twitter.com/mainstreetmarkets"
          />
          <SocialButton
            icon="logo-instagram"
            platform="Instagram"
            handle="@mainstreetmarkets"
            url="https://instagram.com/mainstreetmarkets"
          />
          <SocialButton
            icon="logo-facebook"
            platform="Facebook"
            handle="Main Street Markets"
            url="https://facebook.com/mainstreetmarkets"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recognition</Text>
          <Text style={styles.recognitionText}>
            🏆 Best Local Shopping App 2024{'\n'}
            ⭐️ Featured on App Store{'\n'}
            🌟 Google Play Editor's Choice
          </Text>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Get in Touch</Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => Linking.openURL('mailto:contact@mainstreetmarkets.com')}
          >
            <Ionicons name="mail" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ in Logan, Utah
          </Text>
          <Text style={styles.copyright}>
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
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f8f8f8',
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  appName: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 15,
    color: '#333',
  },
  appVersion: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  socialText: {
    flex: 1,
    marginLeft: 12,
  },
  socialPlatform: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  socialHandle: {
    fontSize: 14,
    color: '#666',
  },
  recognitionText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#666',
  },
  contactSection: {
    padding: 20,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  copyright: {
    fontSize: 12,
    color: '#999',
  },
});

export default AboutScreen;