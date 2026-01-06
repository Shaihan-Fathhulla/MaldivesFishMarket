import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import { useAuth } from '../context/AuthContext';
import { loadFishListings, saveFishListings } from '../utils/storage';
import FishCard from '../components/FishCard';

const FishermanHomeScreen = ({ navigation }) => {
  const { currentUser, logout } = useAuth();
  const [myFish, setMyFish] = useState([]);

  useEffect(() => {
    loadMyFish();
    const unsubscribe = navigation.addListener('focus', () => {
      loadMyFish();
    });
    return unsubscribe;
  }, [navigation]);

  const loadMyFish = async () => {
    const allFish = await loadFishListings();
    const myListings = allFish.filter(fish => fish.fishermanId === currentUser.id);
    setMyFish(myListings);
  };

  const handleEdit = (fish) => {
    navigation.navigate('AddEditFish', { fish });
  };

  const handleDelete = async (fish) => {
    Alert.alert(
      'Delete Fish',
      'Are you sure you want to delete this listing?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const allFish = await loadFishListings();
            const updated = allFish.filter(f => f.id !== fish.id);
            await saveFishListings(updated);
            loadMyFish();
          },
        },
      ]
    );
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
          <Text style={styles.greeting}>Hello, {currentUser.fullName}! 🎣</Text>
          <Text style={styles.subGreeting}>Your Fish Listings</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddEditFish', { fish: null })}
        >
          <Text style={styles.addButtonText}>+ Add New Fish</Text>
        </TouchableOpacity>

        {myFish.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No fish listings yet</Text>
            <Text style={styles.emptySubtext}>Add your first catch!</Text>
          </View>
        ) : (
          myFish.map(fish => (
            <FishCard
              key={fish.id}
              fish={fish}
              onEdit={handleEdit}
              onDelete={handleDelete}
              showActions={true}
              isSold={fish.sold}
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
  logoutText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  addButton: {
    backgroundColor: colors.success,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
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

export default FishermanHomeScreen;