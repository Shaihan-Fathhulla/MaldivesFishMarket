import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const AddressInputScreen = ({ route, navigation }) => {
  const { cart, setCart, total } = route.params;

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    if (!address || !city || !phone) {
      Alert.alert('Error', 'Please fill in all address fields');
      return;
    }

    navigation.navigate('Payment', {
      cart,
      setCart,
      total,
      deliveryFee: 10,
      isDelivery: true,
      address: { address, city, phone },
    });
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
        <Text style={styles.headerTitle}>Delivery Address</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Street Address</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Enter your street address"
            value={address}
            onChangeText={setAddress}
            multiline
          />

          <Text style={styles.label}>City</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="e.g., Male"
            value={city}
            onChangeText={setCity}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={globalStyles.button} onPress={handleContinue}>
            <Text style={globalStyles.buttonText}>Continue to Payment</Text>
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
    borderRadius: 12,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 10,
  },
});

export default AddressInputScreen;