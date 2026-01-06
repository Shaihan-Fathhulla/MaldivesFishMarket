import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import { useAuth } from '../context/AuthContext';
import { loadFishListings } from '../utils/storage';
import FishCard from '../components/FishCard';

const CustomerHomeScreen = ({ navigation }) => {
  const { currentUser, logout } = useAuth();
  const [allFish, setAllFish] = useState([]);
  const [filteredFish, setFilteredFish] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadFish();
    const unsubscribe = navigation.addListener('focus', () => {
      loadFish();
    });
    return unsubscribe;
  }, [navigation]);

  const loadFish = async () => {
    const listings = await loadFishListings();
    const available = listings.filter(fish => !fish.sold);
    setAllFish(available);
    setFilteredFish(available);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredFish(allFish);
    } else {
      const filtered = allFish.filter(fish =>
        fish.fishName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFish(filtered);
    }
  };

  const handleAddToCart = (fish) => {
    const isAlreadyInCart = cart.some(item => item.id === fish.id);
    if (isAlreadyInCart) {
      Alert.alert('Already in Cart', 'This fish is already in your cart');
      return;
    }
    setCart([...cart, fish]);
    Alert.alert('Added to Cart', `${fish.fishName} added to cart`);
  };

  const handleGoToCart = () => {
    navigation.navigate('Cart', { cart, setCart });
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout },
      ]
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {currentUser.fullName}! 🛒</Text>
          <Text style={styles.subGreeting}>Find Fresh Fish</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleGoToCart} style={styles.cartButton}>
            <Text style={styles.cartText}>🛒 Cart ({cart.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search fish by name..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <ScrollView style={styles.content}>
        {filteredFish.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No fish found' : 'No fish available yet'}
            </Text>
            <Text style={styles.emptySubtext}>
              {searchQuery ? 'Try a different search' : 'Check back soon!'}
            </Text>
          </View>
        ) : (
          filteredFish.map(fish => (
            <FishCard
              key={fish.id}
              fish={fish}
              onAddToCart={handleAddToCart}
            />
          ))
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  subGreeting: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginTop: 5,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  cartButton: {
    marginBottom: 10,
  },
  cartText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  logoutText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: colors.white,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.background,
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
});

export default CustomerHomeScreen;