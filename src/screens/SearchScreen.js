// src/screens/SearchScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'food', name: 'Food & Drinks' },
];

const PRICE_RANGES = [
  { id: 'all', name: 'All Prices' },
  { id: 'under25', name: 'Under $25' },
  { id: '25to50', name: '$ 25 - 50' },
  { id: '50to100', name: '$ 50 - 100' },
  { id: 'over100', name: 'Over $100' },
];

const SORT_OPTIONS = [
  { id: 'relevance', name: 'Relevance' },
  { id: 'priceLow', name: 'Price: Low to High' },
  { id: 'priceHigh', name: 'Price: High to Low' },
  { id: 'rating', name: 'Rating' },
];

const ProductCard = ({ product, onPress }) => (
  <TouchableOpacity style={styles.productCard} onPress={onPress}>
    <View style={styles.productImage}>
      <Ionicons name="image-outline" size={40} color="#666" />
    </View>
    <View style={styles.productInfo}>
      <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
      <Text style={styles.shopName}>{product.shopName}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>{product.rating}</Text>
        <Text style={styles.reviewCount}>({product.reviews})</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const FilterChip = ({ label, selected, onPress }) => (
  <TouchableOpacity 
    style={[styles.filterChip, selected && styles.selectedFilterChip]}
    onPress={onPress}
  >
    <Text style={[styles.filterChipText, selected && styles.selectedFilterChipText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedSort, setSelectedSort] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for demonstration
  const mockProducts = [
    {
      id: 1,
      name: 'Wireless Noise-Canceling Headphones',
      shopName: "Bob's Electronics",
      price: 199.99,
      rating: 4.8,
      reviews: 245,
      category: 'electronics'
    },
    {
      id: 2,
      name: 'Handmade Leather Wallet',
      shopName: "Craft Corner",
      price: 49.99,
      rating: 4.6,
      reviews: 128,
      category: 'fashion'
    },
    // Add more mock products as needed
  ];

  const filteredProducts = mockProducts.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    // Add price range filtering logic here
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, shops, and categories"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="options-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map(category => (
              <FilterChip
                key={category.id}
                label={category.name}
                selected={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
              />
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>Price Range</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {PRICE_RANGES.map(range => (
              <FilterChip
                key={range.id}
                label={range.name}
                selected={selectedPriceRange === range.id}
                onPress={() => setSelectedPriceRange(range.id)}
              />
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>Sort By</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {SORT_OPTIONS.map(option => (
              <FilterChip
                key={option.id}
                label={option.name}
                selected={selectedSort === option.id}
                onPress={() => setSelectedSort(option.id)}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {/* Results */}
      <ScrollView style={styles.resultsContainer}>
        <View style={styles.resultsGrid}>
          {filteredProducts.map(product => (
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
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  filterButton: {
    padding: 10,
  },
  filtersContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  filterChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedFilterChip: {
    backgroundColor: '#007AFF',
  },
  filterChipText: {
    color: '#666',
  },
  selectedFilterChipText: {
    color: '#fff',
  },
  resultsContainer: {
    flex: 1,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
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
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  shopName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
});

export default SearchScreen;