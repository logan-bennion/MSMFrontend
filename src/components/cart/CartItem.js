// src/components/cart/CartItem.js
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: item.product.image }}
                style={styles.image}
                defaultSource={require('../../../assets/icon.png')}
            />
            <View style={styles.details}>
                <Text style={styles.name} numberOfLines={2}>
                    {item.product.name}
                </Text>
                <Text style={styles.price}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                </Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                        onPress={() => onUpdateQuantity(Math.max(0, item.quantity - 1))}
                        style={styles.quantityButton}
                    >
                        <Ionicons name="remove" size={20} color="#007AFF" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity 
                        onPress={() => onUpdateQuantity(item.quantity + 1)}
                        style={styles.quantityButton}
                    >
                        <Ionicons name="add" size={20} color="#007AFF" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity 
                onPress={onRemove}
                style={styles.removeButton}
            >
                <Ionicons name="trash-outline" size={24} color="#FF3B30" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    details: {
        flex: 1,
        marginLeft: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        padding: 4,
    },
    quantity: {
        paddingHorizontal: 12,
        fontSize: 16,
        fontWeight: '500',
    },
    removeButton: {
        padding: 4,
    },
});

export default CartItem;