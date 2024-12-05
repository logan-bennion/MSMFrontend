// src/screens/HomeScreen.js
import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  RefreshControl,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import EnhancedImage from '../components/common/EnhancedImage';

const { width } = Dimensions.get('window');

const ShopCard = ({ shop, onPress }) => (
  <TouchableOpacity 
    style={styles.shopCard} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <EnhancedImage
      source={shop.image}
      style={styles.shopImageContainer}
      fallbackIcon="storefront-outline"
    />
    <LinearGradient
      colors={['transparent', 'rgba(0,0,0,0.8)']}
      style={styles.shopGradient}
    >
      <View style={styles.shopInfo}>
        <Text style={styles.shopName}>{shop.name}</Text>
        <Text style={styles.shopCategory}>{shop.category}</Text>
        <View style={styles.shopStats}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.shopRating}>{shop.rating}</Text>
            <Text style={styles.ratingCount}>({shop.reviewCount})</Text>
          </View>
          <View style={styles.distanceContainer}>
            <Ionicons name="location-outline" size={16} color="#fff" />
            <Text style={styles.shopDistance}>{shop.distance} miles</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
    {shop.isOpen ? (
      <View style={[styles.statusBadge, styles.openBadge]}>
        <Text style={styles.statusText}>Open</Text>
      </View>
    ) : (
      <View style={[styles.statusBadge, styles.closedBadge]}>
        <Text style={styles.statusText}>Closed</Text>
      </View>
    )}
  </TouchableOpacity>
);

const DealCard = ({ deal, onPress }) => {
  const discountPercentage = Math.round((1 - deal.price/deal.originalPrice) * 100);
  
  return (
    <TouchableOpacity 
      style={styles.dealCard} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.dealImageWrapper}>
        <EnhancedImage
          source={deal.image}
          style={styles.dealImage}
          fallbackIcon="image-outline"
        />
        {discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
          </View>
        )}
      </View>
      <View style={styles.dealInfo}>
        <Text style={styles.dealName} numberOfLines={2}>{deal.name}</Text>
        <Text style={styles.shopName}>{deal.shopName}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.dealPrice}>${deal.price.toFixed(2)}</Text>
          <Text style={styles.originalPrice}>${deal.originalPrice.toFixed(2)}</Text>
        </View>
        {deal.stock < 10 && (
          <Text style={styles.lowStock}>Only {deal.stock} left!</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const CategoryButton = ({ category, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.categoryButton, isSelected && styles.categoryButtonSelected]}
    onPress={onPress}
  >
    <Text 
      style={[styles.categoryButtonText, isSelected && styles.categoryButtonTextSelected]}
    >
      {category}
    </Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  const categories = [
    'All', 
    'Services', 
    'Food & Dining', 
    'Retail', 
    'Seasonal', 
    'Events'
  ];

  const featuredShops = [
    {
      id: 1,
      name: "Creative Corner Art Studio",
      category: 'Services',
      rating: 4.9,
      reviewCount: 156,
      distance: 0.3,
      image: 'https://picsum.photos/seed/creative/400/300',
      isOpen: true,
      description: "Creative Corner Art Studio specializes in custom window paintings, murals, and seasonal decorations for local businesses.",
      address: "456 Main Street, Downtown District",
      phone: "(555) 123-4567",
      email: "create@creativecorner.local",
      hours: "Tue-Sat: 9AM-6PM, Sun-Mon: By Appointment",
      website: "www.creativecorner.local",
      businessType: "Service Provider"
    },
    {
      id: 2,
      name: "Green Valley Farms Market",
      category: 'Food & Dining',
      rating: 4.7,
      reviewCount: 283,
      distance: 1.1,
      image: 'https://picsum.photos/seed/farm/400/300',
      isOpen: true,
      description: "Local organic produce and farm-fresh goods directly from local farmers.",
      address: "789 Market Street, Farmers District",
      phone: "(555) 234-5678",
      email: "info@greenvalleyfarms.local",
      hours: "Mon-Sun: 8AM-8PM",
      website: "www.greenvalleyfarms.local",
      businessType: "Food Market"
    },
    {
      id: 3,
      name: "Main Street Collective",
      category: 'Retail',
      rating: 4.8,
      reviewCount: 197,
      distance: 0.5,
      image: 'https://picsum.photos/seed/collective/400/300',
      isOpen: false,
      description: "A curated collection of local artisan products and handcrafted goods.",
      address: "321 Main Street, Arts District",
      phone: "(555) 345-6789",
      email: "hello@mainstreetcollective.local",
      hours: "Tue-Sun: 10AM-7PM, Mon: Closed",
      website: "www.mainstreetcollective.local",
      businessType: "Retail Store"
    },
  ];

  const deals = [
    {
      id: 1,
      name: 'Holiday Window Painting Service',
      shopName: "Creative Corner Art Studio",
      price: 127.49,
      originalPrice: 149.99,
      image: 'https://picsum.photos/seed/window/400/400',
      stock: 8
    },
    {
      id: 2,
      name: 'Local Organic Thanksgiving Box',
      shopName: "Green Valley Farms",
      price: 169.99,
      originalPrice: 189.99,
      image: 'https://picsum.photos/seed/thanksgiving/400/400',
      stock: 15
    },
    {
      id: 3,
      name: 'Local Artisan Gift Basket',
      shopName: "Main Street Collective",
      price: 69.99,
      originalPrice: 79.99,
      image: 'https://picsum.photos/seed/gift/400/400',
      stock: 20
    },
  ];
  

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, 
  
  

  []);
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Updated Hero Banner */}
        <LinearGradient
          colors={['#2C5282', '#4299E1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBanner}
        >
          <Text style={styles.heroTitle}>Shop Local, Support Local</Text>
          <Text style={styles.heroSubtitle}>Discover the best of Main Street in your area</Text>
          <TouchableOpacity 
            style={styles.heroButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.heroButtonText}>Explore Local Shops</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>

        {/* Featured Local Businesses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Local Businesses</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search', { screen: 'Shops' })}>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#2C5282" />
          ) : (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.shopsContainer}
            >
              {featuredShops.map(shop => (
                <ShopCard 
                 key={shop.id} 
                 shop={shop} 
                 onPress={() => navigation.navigate('Shop', { shop })}
                />
              ))}
            </ScrollView>
          )}
        </View>

        {/* Local Deals & Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Local Deals & Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search', { screen: 'Deals' })}>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#2C5282" />
          ) : (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dealsContainer}
            >
              {deals.map(deal => (
                <DealCard 
                  key={deal.id} 
                  deal={deal} 
                  onPress={() => navigation.navigate('Product', { 
                    productId: deal.id,
                    title: deal.name
                  })}
                />
              ))}
            </ScrollView>
          )}
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
    heroBanner: {
      padding: 20,
      minHeight: 200,
      justifyContent: 'center',
    },
    heroTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 10,
    },
    heroSubtitle: {
      fontSize: 18,
      color: '#fff',
      opacity: 0.9,
      marginBottom: 20,
    },
    heroButton: {
      backgroundColor: '#fff',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 25,
      alignSelf: 'flex-start',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    heroButtonText: {
      color: '#007AFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    categoriesContainer: {
      padding: 20,
      paddingTop: 10,
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
      fontWeight: '600',
    },
    section: {
      padding: 20,
      paddingTop: 0,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    seeAllButton: {
      color: '#007AFF',
      fontSize: 16,
    },
    shopsContainer: {
      paddingRight: 20,
    },
    shopCard: {
      width: width * 0.7,
      height: 200,
      marginLeft: 20,
      borderRadius: 15,
      overflow: 'hidden',
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
    shopImageContainer: {
      width: '100%',
      height: '100%',
    },
    shopGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '50%',
      padding: 15,
      justifyContent: 'flex-end',
    },
    shopInfo: {
      justifyContent: 'flex-end',
    },
    shopName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 5,
    },
    shopCategory: {
      color: '#fff',
      opacity: 0.8,
      marginBottom: 8,
    },
    shopStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    shopRating: {
      color: '#fff',
      marginLeft: 5,
      fontWeight: '600',
    },
    ratingCount: {
      color: '#fff',
      opacity: 0.8,
      marginLeft: 5,
    },
    distanceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    shopDistance: {
      color: '#fff',
      marginLeft: 5,
    },
    statusBadge: {
      position: 'absolute',
      top: 10,
      right: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 12,
    },
    openBadge: {
      backgroundColor: '#4CAF50',
    },
    closedBadge: {
      backgroundColor: '#F44336',
    },
    statusText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    dealsContainer: {
      paddingRight: 20,
    },
    dealCard: {
      width: width * 0.5,
      marginLeft: 20,
      backgroundColor: '#fff',
      borderRadius: 15,
      overflow: 'hidden',
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
    dealImageWrapper: {
      position: 'relative',
    },
    dealImage: {
      width: '100%',
      height: 150,
      backgroundColor: '#f5f5f5',
    },
    discountBadge: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: '#FF4B4B',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    discountText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    dealInfo: {
      padding: 15,
    },
    dealName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      height: 40, // Fixed height for 2 lines
      lineHeight: 20,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    dealPrice: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#007AFF',
      marginRight: 8,
    },
    originalPrice: {
      fontSize: 14,
      color: '#666',
      textDecorationLine: 'line-through',
    },
    lowStock: {
      color: '#FF4B4B',
      fontSize: 12,
      marginTop: 5,
      fontWeight: '500',
    },
    heroButton: {
      backgroundColor: '#fff',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 25,
      alignSelf: 'flex-start',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    heroButtonText: {
      color: '#2C5282',
      fontSize: 16,
      fontWeight: 'bold',
    },
    categoryButtonSelected: {
      backgroundColor: '#2C5282',
    },
    seeAllButton: {
      color: '#2C5282',
      fontSize: 16,
    },
    dealPrice: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2C5282',
      marginRight: 8,
    },
  });

  export default HomeScreen;