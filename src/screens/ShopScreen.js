import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EnhancedImage from '../components/common/EnhancedImage';

const { width } = Dimensions.get('window');

const CategoryButton = ({ title, selected, onPress }) => (
  <TouchableOpacity 
    style={[styles.categoryButton, selected && styles.categoryButtonSelected]}
    onPress={onPress}
  >
    <Text style={[styles.categoryButtonText, selected && styles.categoryButtonTextSelected]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const ListingCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.listingCard} onPress={onPress}>
    <EnhancedImage
      source={item.image}
      style={styles.listingImage}
      fallbackIcon={item.type === 'service' ? 'calendar-outline' : 'image-outline'}
    />
    <View style={styles.listingInfo}>
      <Text style={styles.listingName}>{item.name}</Text>
      <Text style={styles.listingPrice}>
        ${item.price}
        {item.type === 'service' && <Text style={styles.priceUnit}>{item.priceUnit}</Text>}
      </Text>
      {item.type === 'service' && (
        <Text style={styles.availability}>Next available: {item.nextAvailable}</Text>
      )}
    </View>
  </TouchableOpacity>
);

const ShopScreen = ({ route, navigation }) => {
  const { shop } = route.params;
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock data for local business details
  const businessDetails = {
    ...shop,
    description: "Creative Corner Art Studio specializes in custom window paintings, murals, and seasonal decorations for local businesses. Our team of professional artists brings your vision to life.",
    address: "456 Main Street, Downtown District",
    phone: "(555) 123-4567",
    email: "create@creativecorner.local",
    hours: "Tue-Sat: 9AM-6PM, Sun-Mon: By Appointment",
    website: "www.creativecorner.local",
    businessType: "Service Provider",
    categories: ['All', 'Window Painting', 'Murals', 'Seasonal', 'Events'],
    listings: [
      {
        id: 1,
        type: 'service',
        name: 'Holiday Window Painting Package',
        price: 127.49,
        priceUnit: '/service',
        image: 'https://picsum.photos/seed/window1/400/400',
        category: 'Window Painting',
        nextAvailable: 'Tomorrow, 2 PM'
      },
      {
        id: 2,
        type: 'service',
        name: 'Custom Business Mural',
        price: 599.99,
        priceUnit: '/project',
        image: 'https://picsum.photos/seed/mural1/400/400',
        category: 'Murals',
        nextAvailable: 'Next Week'
      },
      {
        id: 3,
        type: 'service',
        name: 'Seasonal Window Refresh',
        price: 89.99,
        priceUnit: '/service',
        image: 'https://picsum.photos/seed/seasonal1/400/400',
        category: 'Seasonal',
        nextAvailable: 'This Weekend'
      },
    ]
  };

  const filteredListings = selectedCategory === 'All'
    ? businessDetails.listings
    : businessDetails.listings.filter(item => item.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.header}>
          <EnhancedImage
            source={businessDetails.image}
            style={styles.headerImage}
            fallbackIcon="business-outline"
          />
          <View style={styles.headerOverlay}>
            <Text style={styles.shopName}>{businessDetails.name}</Text>
            <Text style={styles.businessType}>{businessDetails.businessType}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{businessDetails.rating}</Text>
              <Text style={styles.ratingCount}>({businessDetails.reviewCount} reviews)</Text>
              <Text style={styles.distance}> • {businessDetails.distance} miles</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="calendar-outline" size={24} color="#2C5282" />
            <Text style={styles.actionText}>Book Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="call-outline" size={24} color="#2C5282" />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="navigate-outline" size={24} color="#2C5282" />
            <Text style={styles.actionText}>Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={24} color="#2C5282" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Business Info */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{businessDetails.description}</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{businessDetails.address}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{businessDetails.hours}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{businessDetails.phone}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{businessDetails.email}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="globe-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{businessDetails.website}</Text>
          </View>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {businessDetails.categories.map((category) => (
            <CategoryButton
              key={category}
              title={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>

        {/* Listings Grid */}
        <View style={styles.listingsGrid}>
          {filteredListings.map((item) => (
            <ListingCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate(
                item.type === 'service' ? 'Service' : 'Product',
                { item }
              )}
            />
          ))}
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
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  businessType: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '600',
  },
  ratingCount: {
    color: '#fff',
    marginLeft: 5,
    opacity: 0.8,
  },
  distance: {
    color: '#fff',
    opacity: 0.8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 5,
    color: '#2C5282',
    fontSize: 12,
  },
  infoSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2C5282',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#666',
    flex: 1,
  },
  categoriesContainer: {
    marginVertical: 10,
  },
  categoriesContent: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  categoryButtonSelected: {
    backgroundColor: '#2C5282',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
  },
  categoryButtonTextSelected: {
    color: '#fff',
  },
  listingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  listingCard: {
    width: (width - 30) / 2,
    marginHorizontal: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  listingImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  listingInfo: {
    padding: 10,
  },
  listingName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  listingPrice: {
    fontSize: 16,
    color: '#2C5282',
    fontWeight: 'bold',
  },
  priceUnit: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'normal',
  },
  availability: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
  },
});

export default ShopScreen;