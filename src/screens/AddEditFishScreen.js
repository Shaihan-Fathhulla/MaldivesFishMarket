import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import { useAuth } from '../context/AuthContext';
import { loadFishListings, saveFishListings, generateId } from '../utils/storage';

const AddEditFishScreen = ({ route, navigation }) => {
  const { fish } = route.params;
  const { currentUser } = useAuth();
  const isEditing = fish !== null;

  const [fishName, setFishName] = useState(fish?.fishName || '');
  const [weight, setWeight] = useState(fish?.weight?.toString() || '');
  const [price, setPrice] = useState(fish?.price?.toString() || '');

  const handleSave = async () => {
    if (!fishName || !weight || !price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const allFish = await loadFishListings();

    if (isEditing) {
      const updated = allFish.map(f =>
        f.id === fish.id
          ? { ...f, fishName, weight: parseFloat(weight), price: parseFloat(price) }
          : f
      );
      await saveFishListings(updated);
      Alert.alert('Success', 'Fish updated successfully!');
    } else {
      const newFish = {
        id: generateId(),
        fishermanId: currentUser.id,
        fishermanName: currentUser.fullName,
        fishName,
        weight: parseFloat(weight),
        price: parseFloat(price),
        sold: false,
        createdAt: new Date().toISOString(),
      };
      await saveFishListings([...allFish, newFish]);
      Alert.alert('Success', 'Fish added successfully!');
    }

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Edit Fish' : 'Add New Fish'}
        </Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Fish Name</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="e.g., Tuna, Grouper, Snapper"
            value={fishName}
            onChangeText={setFishName}
          />

          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="e.g., 5.5"
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Price (MVR)</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="e.g., 150"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
          />

          <TouchableOpacity style={globalStyles.button} onPress={handleSave}>
            <Text style={globalStyles.buttonText}>
              {isEditing ? 'Update Fish' : 'Add Fish'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  form: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 10,
  },
});

export default AddEditFishScreen;