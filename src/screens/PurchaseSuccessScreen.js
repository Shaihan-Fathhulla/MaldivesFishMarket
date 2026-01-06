import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const PurchaseSuccessScreen = ({ route, navigation }) => {
  const { isDelivery } = route.params;

  const handleBackToHome = () => {
    navigation.navigate('CustomerHome');
  };

  return (
    <View style={[globalStyles.container, globalStyles.centered]}>
      <Text style={styles.successIcon}>✅</Text>
      <Text style={styles.title}>Purchase Completed!</Text>
      <Text style={styles.message}>
        {isDelivery
          ? 'Your fish will be delivered shortly'
          : 'Please come to the fish market to pick up your fish'}
      </Text>

      <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
        <Text style={globalStyles.buttonText}>Back to Homepage</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  successIcon: {
    fontSize: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 40,
  },
  homeButton: {
    width: '80%',
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default PurchaseSuccessScreen;