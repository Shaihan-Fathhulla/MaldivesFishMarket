import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const RoleSelectionScreen = ({ navigation }) => {
  return (
    <View style={[globalStyles.container, globalStyles.centered]}>
      <Text style={styles.emoji}>🐟</Text>
      <Text style={globalStyles.title}>Maldives Fish Market</Text>
      <Text style={globalStyles.subtitle}>What would you like to do today?</Text>

      <TouchableOpacity
        style={[styles.roleButton, styles.fishermanButton]}
        onPress={() => navigation.navigate('Auth', { userType: 'fisherman' })}
      >
        <Text style={styles.roleIcon}>🎣</Text>
        <Text style={styles.roleText}>I want to SELL fish</Text>
        <Text style={styles.roleSubtext}>Fisherman</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.roleButton, styles.customerButton]}
        onPress={() => navigation.navigate('Auth', { userType: 'customer' })}
      >
        <Text style={styles.roleIcon}>🛒</Text>
        <Text style={styles.roleText}>I want to BUY fish</Text>
        <Text style={styles.roleSubtext}>Customer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  roleButton: {
    width: '100%',
    padding: 25,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fishermanButton: {
    backgroundColor: colors.primary,
  },
  customerButton: {
    backgroundColor: colors.accent,
  },
  roleIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  roleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
  },
  roleSubtext: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
});

export default RoleSelectionScreen;