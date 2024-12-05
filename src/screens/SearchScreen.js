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
  { id: 'services', name: 'Services' },
  { id: 'retail', name: 'Retail' },
  { id: 'food', name: 'Food & Dining' },
  { id: 'seasonal', name: 'Seasonal' },
  { id: 'events', name: 'Events' },
];

const PRICE_RANGES = [
  { id: 'all', name: 'All Prices' },
  { id: 'under50', name: 'Under $50' },
  { id: '50to100', name: '$50 - $100' },
  { id: '100to200', name: '$100 - $200' },
  { id: 'over200', name: 'Over $200' },
];

const SORT_OPTIONS = [
  { id: 'relevance', name: 'Relevance' },
  { id: 'distance', name: 'Distance' },
  { id: 'rating', name: 'Rating' },
  { id: 'priceLow', name: 'Price: Low to High' },
  { id: 'priceHigh', name: 'Price: High to Low' },
];

const AVAILABILITY = [
  { id: 'all', name: 'Any Time' },
  { id: 'today', name: 'Today' },
  { id: 'thisWeek', name: 'This Week' },
  { id: 'thisMonth', name: 'This Month' },
];

const ListingCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.productCard} onPress={onPress}>
    <View style={styles.productImage}>
      <Ionicons 
        name={item.type === 'service' ? 'calendar-outline' : 'image-outline'} 
        size={40} 
        color="#666" 
      />
    </View>
    <View style={styles.productInfo}>
      <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.shopName}>{item.vendorName}</Text>
      <Text style={styles.productPrice}>
        ${item.price.toFixed(2)}
        {item.type === 'service' && <Text style={styles.priceUnit}>{item.priceUnit}</Text>}
      </Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>{item.rating}</Text>
        <Text style={styles.reviewCount}>({item.reviews})</Text>
        <Text style={styles.distance}> • {item.distance} mi</Text>
      </View>
      {item.type === 'service' && item.nextAvailable && (
        <Text style={styles.availability}>Next available: {item.nextAvailable}</Text>
      )}
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
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data reflecting local businesses and services
  const mockListings = [
    {
      id: 1,
      type: 'service',
      name: 'Holiday Window Painting Service',
      vendorName: "Creative Corner Art Studio",
      price: 127.49,
      priceUnit: '/service',
      rating: 4.9,
      reviews: 156,
      distance: 0.3,
      category: 'services',
      nextAvailable: 'Tomorrow, 10 AM'
    },
    {
      id: 2,
      type: 'product',
      name: 'Local Organic Thanksgiving Box',
      vendorName: "Green Valley Farms",
      price: 169.99,
      rating: 4.7,
      reviews: 283,
      distance: 1.1,
      category: 'food'
    },
    {
      id: 3,
      type: 'service',
      name: 'Professional Snow Removal',
      vendorName: "Winter Warriors LLC",
      price: 299.99,
      priceUnit: '/season',
      rating: 4.8,
      reviews: 178,
      distance: 0.8,
      category: 'seasonal',
      nextAvailable: 'Seasonal booking'
    }
  ];

  const filteredListings = mockListings.filter(item => {
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
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
            placeholder="Search local businesses and services"
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
          <Ionicons name="options-outline" size={24} color="#2C5282" />
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

          <Text style={styles.filterTitle}>Availability</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {AVAILABILITY.map(option => (
              <FilterChip
                key={option.id}
                label={option.name}
                selected={selectedAvailability === option.id}
                onPress={() => setSelectedAvailability(option.id)}
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
          {filteredListings.map(item => (
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
    color: '#2C5282',
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
    backgroundColor: '#2C5282',
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
    height: 36,
  },
  shopName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C5282',
    marginBottom: 4,
  },
  priceUnit: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'normal',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
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
  distance: {
    fontSize: 12,
    color: '#666',
  },
  availability: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  }
});

export default SearchScreen;