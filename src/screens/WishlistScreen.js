// src/screens/WishlistScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const WishlistItem = ({ item, onRemove, onMoveToCart }) => (
  <View style={styles.wishlistItem}>
    <View style={styles.itemImage}>
      <Ionicons name="image-outline" size={40} color="#666" />
    </View>
    
    <View style={styles.itemDetails}>
      <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.shopName}>{item.shopName}</Text>
      
      <View style={styles.priceRow}>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        {item.originalPrice && (
          <Text style={styles.originalPrice}>
            ${item.originalPrice.toFixed(2)}
          </Text>
        )}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.moveToCartButton}
          onPress={onMoveToCart}
        >
          <Ionicons name="cart-outline" size={18} color="#fff" />
          <Text style={styles.moveToCartText}>Move to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.removeButton}
          onPress={onRemove}
        >
          <Ionicons name="trash-outline" size={18} color="#FF4B4B" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const WishlistScreen = ({ navigation }) => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = async (item) => {
    const success = await addToCart(item, 1);
    if (success) {
      removeFromWishlist(item.id);
      Alert.alert(
        "Added to Cart",
        "Item moved to cart successfully",
        [
          {
            text: "Continue Shopping",
            style: "cancel"
          },
          {
            text: "View Cart",
            onPress: () => navigation.navigate('Cart')
          }
        ]
      );
    }
  };

  const handleRemoveItem = (item) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your wishlist?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove",
          onPress: () => removeFromWishlist(item.id),
          style: "destructive"
        }
      ]
    );
  };

  const handleClearWishlist = () => {
    Alert.alert(
      "Clear Wishlist",
      "Are you sure you want to remove all items from your wishlist?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Clear",
          onPress: clearWishlist,
          style: "destructive"
        }
      ]
    );
  };

  if (wishlistItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        {wishlistItems.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClearWishlist}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.wishlistList}>
        {wishlistItems.map((item, index) => (
          <WishlistItem
            key={item.id}
            item={item}
            onRemove={() => handleRemoveItem(item)}
            onMoveToCart={() => handleMoveToCart(item)}
          />
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  clearButton: {
    padding: 5,
  },
  clearButtonText: {
    color: '#FF4B4B',
    fontSize: 14,
  },
  wishlistList: {
    flex: 1,
  },
  wishlistItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemImage: {
    width: 80,
    height: 80,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  shopName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moveToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  moveToCartText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginVertical: 20,
  },
  shopButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WishlistScreen;