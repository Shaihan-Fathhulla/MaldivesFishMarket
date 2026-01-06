import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';

// Import all screens
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import AuthScreen from './src/screens/AuthScreen';
import FishermanHomeScreen from './src/screens/FishermanHomeScreen';
import AddEditFishScreen from './src/screens/AddEditFishScreen';
import CustomerHomeScreen from './src/screens/CustomerHomeScreen';
import CartScreen from './src/screens/CartScreen';
import DeliveryOptionScreen from './src/screens/DeliveryOptionScreen';
import AddressInputScreen from './src/screens/AddressInputScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import PurchaseSuccessScreen from './src/screens/PurchaseSuccessScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!currentUser ? (
          <>
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
          </>
        ) : currentUser.userType === 'fisherman' ? (
          <>
            <Stack.Screen name="FishermanHome" component={FishermanHomeScreen} />
            <Stack.Screen name="AddEditFish" component={AddEditFishScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="CustomerHome" component={CustomerHomeScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="DeliveryOption" component={DeliveryOptionScreen} />
            <Stack.Screen name="AddressInput" component={AddressInputScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="PurchaseSuccess" component={PurchaseSuccessScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}