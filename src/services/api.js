import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:8000/api';

const getHeaders = async () => {
    // For development/testing, return empty headers
    return {
        'Content-Type': 'application/json',
        // 'Authorization': token ? `Bearer ${token}` : '', // Commented out for testing
    };
};

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
