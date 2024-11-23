// src/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import all screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import WishlistScreen from '../screens/WishlistScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShopScreen from '../screens/ShopScreen';
import ProductScreen from '../screens/ProductScreen';
import CheckoutScreen from '../screens/CheckoutScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main tab navigator
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home-outline';
            break;
          case 'Search':
            iconName = 'search-outline';
            break;
          case 'Cart':
            iconName = 'cart-outline';
            break;
          case 'Wishlist':
            iconName = 'heart-outline';
            break;
          case 'Profile':
            iconName = 'person-outline';
            break;
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#999',
      tabBarStyle: {
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
      },
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: '600',
      },
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        headerTitle: 'Main Street Markets'
      }}
    />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Wishlist" component={WishlistScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Main stack navigator that wraps the tab navigator
const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="MainTabs" 
      component={MainTabs} 
      options={{ headerShown: false }}
    />
    
    <Stack.Screen 
      name="Shop" 
      component={ShopScreen}
      options={({ route }) => ({
        title: route.params?.shop?.name || 'Shop Details',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
      })}
    />

    <Stack.Screen 
      name="Product" 
      component={ProductScreen}
      options={({ route }) => ({
        title: route.params?.product?.name || 'Product Details',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
      })}
    />

    <Stack.Screen 
      name="Checkout" 
      component={CheckoutScreen}
      options={{
        title: 'Checkout',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
      }}
    />
  </Stack.Navigator>
);

export default AppNavigator;