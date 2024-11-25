// src/context/ProductContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';

const ProductContext = createContext();

// Create axios instance
const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Fetch all products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/api/products/');
            setProducts(response.data);
            setFilteredProducts(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to fetch products');
            Alert.alert('Error', 'Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch a single product by ID
    const fetchProductById = async (productId) => {
        try {
            setLoading(true);
            const response = await api.get(`/api/products/products/${productId}/`);
            setSelectedProduct(response.data);
            setError(null);
            return response.data;
        } catch (err) {
            console.error('Error fetching product:', err);
            setError('Failed to fetch product details');
            Alert.alert('Error', 'Failed to load product details. Please try again.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Search products
    const searchProducts = (searchTerm) => {
        if (!searchTerm) {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    // Filter products by category
    const filterByCategory = (category) => {
        if (!category) {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter(product => 
            product.category === category
        );
        setFilteredProducts(filtered);
    };

    // Sort products
    const sortProducts = (sortBy) => {
        let sorted = [...filteredProducts];
        switch (sortBy) {
            case 'price-low-high':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high-low':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'name-az':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-za':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }
        setFilteredProducts(sorted);
    };

    // Fetch products on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider
            value={{
                products,
                filteredProducts,
                selectedProduct,
                loading,
                error,
                fetchProducts,
                fetchProductById,
                searchProducts,
                filterByCategory,
                sortProducts,
                setSelectedProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

// Example usage in App.js:
/*
import { ProductProvider } from './context/ProductContext';

export default function App() {
    return (
        <ProductProvider>
            {/* Your app components *//*}
        </ProductProvider>
    );
}
*/

// Example usage in a component:
/*
import { useProducts } from './context/ProductContext';

const ProductList = () => {
    const { 
        products, 
        loading, 
        error, 
        searchProducts, 
        filterByCategory,
        sortProducts 
    } = useProducts();

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <View>
            <SearchBar onSearch={searchProducts} />
            <CategoryFilter onSelect={filterByCategory} />
            <SortOptions onSort={sortProducts} />
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </View>
    );
};
*/