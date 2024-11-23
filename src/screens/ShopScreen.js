// src/screens/ShopScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
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

const ProductCard = ({ product, onPress }) => (
  <TouchableOpacity style={styles.productCard} onPress={onPress}>
    <EnhancedImage
      source={product.image}
      style={styles.productImage}
      fallbackIcon="image-outline"
    />
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
    </View>
  </TouchableOpacity>
);

const ShopScreen = ({ route, navigation }) => {
  const { shop } = route.params;
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock data for shop details
  const shopDetails = {
    ...shop,
    description: "Your one-stop shop for all electronics needs. We offer the latest gadgets, accessories, and expert advice.",
    address: "123 Main Street, City, State 12345",
    phone: "(555) 123-4567",
    hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM",
    categories: ['All', 'Electronics', 'Accessories', 'Gadgets', 'Smart Home'],
    products: [
      {
        id: 1,
        name: 'Wireless Earbuds',
        price: 79.99,
        image: 'https://picsum.photos/seed/prod1/400/400',
        category: 'Electronics'
      },
      {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        image: 'https://picsum.photos/seed/prod2/400/400',
        category: 'Gadgets'
      },
      {
        id: 3,
        name: 'Phone Case',
        price: 19.99,
        image: 'https://picsum.photos/seed/prod3/400/400',
        category: 'Accessories'
      },
      // Add more products as needed
    ]
  };

  const filteredProducts = selectedCategory === 'All'
    ? shopDetails.products
    : shopDetails.products.filter(product => product.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.header}>
          <EnhancedImage
            source={shopDetails.image}
            style={styles.headerImage}
            fallbackIcon="storefront-outline"
          />
          <View style={styles.headerOverlay}>
            <Text style={styles.shopName}>{shopDetails.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{shopDetails.rating}</Text>
              <Text style={styles.ratingCount}>(123 reviews)</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="call-outline" size={24} color="#007AFF" />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="navigate-outline" size={24} color="#007AFF" />
            <Text style={styles.actionText}>Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={24} color="#007AFF" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Shop Info */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{shopDetails.description}</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{shopDetails.address}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{shopDetails.hours}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{shopDetails.phone}</Text>
          </View>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {shopDetails.categories.map((category) => (
            <CategoryButton
              key={category}
              title={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => navigation.navigate('Product', { product })}
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
    color: '#007AFF',
  },
  infoSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginBottom: 10,
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
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
  },
  categoryButtonTextSelected: {
    color: '#fff',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  productCard: {
    width: (width - 30) / 2,
    marginHorizontal: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default ShopScreen;