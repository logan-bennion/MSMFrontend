// src/screens/ProductScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const { width } = Dimensions.get('window');

const ProductScreen = ({ route, navigation }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { selectedProduct, loading, error, fetchProductById } = useProducts();
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  // Get the product ID from navigation params
  const productId = route.params?.productId;

  // Fetch product details when component mounts
  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    }
  }, [productId]);

  // Show loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </SafeAreaView>
    );
  }

  // Show error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading product: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // If no product is loaded
  if (!selectedProduct) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const inWishlist = isInWishlist(selectedProduct.id);

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(selectedProduct.id);
    } else {
      addToWishlist(selectedProduct);
    }
  };

  const handleAddToCart = () => {
    if (selectedProduct.sizes && !selectedSize) {
      Alert.alert('Please Select Size', 'You must select a size before adding to cart');
      return;
    }

    addToCart(selectedProduct.id, quantity)
      .then(() => {
        Alert.alert(
          'Added to Cart',
          'Item successfully added to cart',
          [
            {
              text: 'Continue Shopping',
              style: 'cancel',
            },
            {
              text: 'View Cart',
              onPress: () => navigation.navigate('Cart'),
            },
          ]
        );
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        Alert.alert(
          'Error',
          'Failed to add item to cart. Please try again.'
        );
      });
  };

  const handleBuyNow = () => {
    if (selectedProduct.sizes && !selectedSize) {
      Alert.alert('Please Select Size', 'You must select a size before proceeding');
      return;
    }
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={80} color="#666" />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{selectedProduct.name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${selectedProduct.price}</Text>
            {selectedProduct.originalPrice && (
              <Text style={styles.originalPrice}>${selectedProduct.originalPrice}</Text>
            )}
            {selectedProduct.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{selectedProduct.discount}% OFF</Text>
              </View>
            )}
          </View>

          {selectedProduct.sizes && (
            <View style={styles.sizeContainer}>
              <Text style={styles.sectionTitle}>Select Size</Text>
              <View style={styles.sizeOptions}>
                {selectedProduct.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeButton,
                      selectedSize === size && styles.selectedSize,
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText,
                    ]}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View style={styles.quantityContainer}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <Ionicons name="remove" size={24} color="#007AFF" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.wishlistButton, inWishlist && styles.wishlistButtonActive]}
            onPress={handleWishlist}
          >
            <Ionicons 
              name={inWishlist ? "heart" : "heart-outline"} 
              size={24} 
              color={inWishlist ? "#FF4B4B" : "#666"} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.addToCartButton]}
            onPress={handleAddToCart}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.buyNowButton]}
            onPress={handleBuyNow}
          >
            <Text style={[styles.buttonText, styles.buyNowText]}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Add these new styles
const additionalStyles = {
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductScreen;