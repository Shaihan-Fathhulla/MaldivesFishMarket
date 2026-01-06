import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const CartScreen = ({ route, navigation }) => {
  const { cart, setCart } = route.params;

  const handleRemoveFromCart = (fishId) => {
    Alert.alert(
      'Remove from Cart',
      'Remove this fish from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const updated = cart.filter(item => item.id !== fishId);
            setCart(updated);
          },
        },
      ]
    );
  };

  const calculateTotal = () => {
    return cart.reduce((sum, fish) => sum + fish.price, 0);
  };

  const handlePurchase = () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to cart first');
      return;
    }
    navigation.navigate('DeliveryOption', { cart, setCart, total: calculateTotal() });
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        {cart.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <Text style={styles.emptySubtext}>Add some fish to get started!</Text>
          </View>
        ) : (
          <>
            {cart.map((fish) => (
              <View key={fish.id} style={styles.cartItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.fishName}>{fish.fishName}</Text>
                  <Text style={styles.fishDetail}>⚖️ {fish.weight} kg</Text>
                  <Text style={styles.fishDetail}>🎣 {fish.fishermanName}</Text>
                  <Text style={styles.price}>MVR {fish.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveFromCart(fish.id)}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>MVR {calculateTotal()}</Text>
            </View>

            <TouchableOpacity style={globalStyles.button} onPress={handlePurchase}>
              <Text style={globalStyles.buttonText}>Proceed to Purchase</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
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
    padding: 15,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: colors.textLight,
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textLight,
  },
  cartItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  fishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  fishDetail: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 3,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: colors.danger,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default CartScreen;