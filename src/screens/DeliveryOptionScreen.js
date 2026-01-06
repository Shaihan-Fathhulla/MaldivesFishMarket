import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const DeliveryOptionScreen = ({ route, navigation }) => {
  const { cart, setCart, total } = route.params;

  const handlePickup = () => {
    navigation.navigate('Payment', {
      cart,
      setCart,
      total,
      deliveryFee: 0,
      isDelivery: false,
    });
  };

  const handleDelivery = () => {
    navigation.navigate('AddressInput', { cart, setCart, total });
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Option</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>How would you like to receive your order?</Text>

        <TouchableOpacity style={styles.optionCard} onPress={handlePickup}>
          <Text style={styles.optionIcon}>🏪</Text>
          <Text style={styles.optionTitle}>Pickup</Text>
          <Text style={styles.optionDescription}>
            Collect your fish from the market
          </Text>
          <Text style={styles.optionPrice}>Free</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard} onPress={handleDelivery}>
          <Text style={styles.optionIcon}>🚚</Text>
          <Text style={styles.optionTitle}>Delivery</Text>
          <Text style={styles.optionDescription}>
            Get your fish delivered to your door
          </Text>
          <Text style={styles.optionPrice}>+ MVR 10</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  optionCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  optionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  optionDescription: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 10,
  },
  optionPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default DeliveryOptionScreen;