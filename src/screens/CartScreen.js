// src/screens/CartScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const CartScreen = ({ navigation }) => {
    const { 
        cart, 
        loading, 
        error, 
        removeFromCart, 
        updateQuantity,
        refreshCart  // Add this if you have it in your context
    } = useCart();

    // Add useEffect to fetch cart data when screen loads
    React.useEffect(() => {
        refreshCart?.();  // Optional: refresh cart when screen mounts
    }, []);

    const handleRemoveItem = async (productId) => {
        try {
            await removeFromCart(productId);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleUpdateQuantity = async (productId, quantity) => {
        try {
            await updateQuantity(productId, quantity);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleCheckout = () => {
        navigation.navigate('Checkout');
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContent}>
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContent}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity 
                        style={styles.retryButton}
                        onPress={refreshCart}
                    >
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    if (!cart?.items?.length) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContent}>
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
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
            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {cart.items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onRemove={() => handleRemoveItem(item.product.id)}
                        onUpdateQuantity={(quantity) => 
                            handleUpdateQuantity(item.product.id, quantity)
                        }
                    />
                ))}
            </ScrollView>
            <View style={styles.summaryContainer}>
                <CartSummary 
                    cart={cart} 
                    onCheckout={handleCheckout}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    summaryContainer: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    shopButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 8,
    },
    shopButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CartScreen;