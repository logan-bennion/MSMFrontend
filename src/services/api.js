import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Test connection function
export const testBackendConnection = async () => {
    try {
        const response = await api.get('/api/test-connection/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Request interceptor for debugging
api.interceptors.request.use(request => {
    console.log('Request URL:', request.baseURL + request.url);
    return request;
});

// Cart API functions
export const cartAPI = {
    // Get user's cart
    getCart: async () => {
        const response = await api.get('/api/cart/');
        return response.data;
    },

    // Add item to cart
    addToCart: async (productId, quantity = 1) => {
        try {
          const response = await api.post('/api/cart/add_item/', {
            product_id: productId,  // Make sure we're sending just the ID
            quantity: quantity
          });
          return response.data;
        } catch (error) {
            console.error('API Error:', error.response?.data || error.message);
            throw error;
        }
      },

    // Remove item from cart
    removeFromCart: async (productId) => {
        const response = await api.post('/api/cart/remove_item/', {
            product_id: productId
        });
        return response.data;
    },

    // Update cart item quantity
    updateQuantity: async (productId, quantity) => {
        // First remove then add with new quantity
        await api.post('/api/cart/remove_item/', { product_id: productId });
        const response = await api.post('/api/cart/add_item/', {
            product_id: productId,
            quantity: quantity
        });
        return response.data;
    }
};

/*
export const api = {
    // Auth endpoints
    login: async (credentials) => {
        const response = await fetch(`${API_URL}/auth/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (response.ok) {
            await AsyncStorage.setItem('token', data.access);
            await AsyncStorage.setItem('refresh_token', data.refresh);
        }
        return { data, ok: response.ok };
    },

    // Products endpoints
    getProducts: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${API_URL}/products/?${queryString}`, {
            headers: await getHeaders(),
        });
        return response.json();
    },

    // Cart endpoints
    getCart: async () => {
        const headers = await getHeaders();
        console.log('Authorization Header:', headers.Authorization);
        const response = await fetch(`${API_URL}/cart/`, {
            headers: headers,
        });
        return response.json();
    },

    addToCart: async (productId, quantity) => {
        const response = await fetch(`${API_URL}/cart/add/`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify({ product_id: productId, quantity }),
        });
        return response.json();
    },

    // Orders endpoints
    createOrder: async (orderData) => {
        const response = await fetch(`${API_URL}/orders/`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(orderData),
        });
        return response.json();
    },
};
*/