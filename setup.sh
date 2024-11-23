#!/bin/bash

# Create main source directory
mkdir -p src/{components/{common,cart,checkout,profile},screens,navigation,context,services,utils}
mkdir -p assets/{images,fonts}

# Create component files
touch src/components/common/{Header,SearchBar,ProductCard}.js
touch src/components/cart/{CartItem,CartSummary}.js
touch src/components/checkout/{CheckoutForm,OrderSummary}.js
touch src/components/profile/OrderHistory.js

# Create screen files
touch src/screens/{HomeScreen,SearchScreen,CartScreen,CheckoutScreen,ProductScreen,WishlistScreen,ProfileScreen}.js

# Create navigation files
touch src/navigation/AppNavigator.js

# Create context files
touch src/context/{AuthContext,CartContext}.js

# Create service files
touch src/services/{api,storage}.js

# Create utility files
touch src/utils/{constants,helpers}.js

# Create base App.js (will overwrite existing one)
cat > App.js << 'EOL'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
EOL

# Add .gitkeep to empty directories to ensure they're tracked by git
touch assets/images/.gitkeep
touch assets/fonts/.gitkeep

echo "Project structure created successfully!"
echo "Next steps:"
echo "1. Install remaining dependencies if needed"
echo "2. Start implementing individual components"
echo "3. Run 'expo start' to test the application"