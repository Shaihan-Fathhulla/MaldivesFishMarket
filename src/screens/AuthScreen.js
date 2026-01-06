import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import { useAuth } from '../context/AuthContext';

const AuthScreen = ({ route, navigation }) => {
  const { userType } = route.params;
  const { register, login } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isLogin && !fullName) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (isLogin) {
      const result = await login(username, password, userType);
      if (!result.success) {
        Alert.alert('Login Failed', result.message);
      }
    } else {
      const result = await register(userType, fullName, username, password);
      if (result.success) {
        Alert.alert('Success', 'Registration successful! Please login.');
        setIsLogin(true);
        setFullName('');
        setUsername('');
        setPassword('');
      } else {
        Alert.alert('Registration Failed', result.message);
      }
    }
  };

  const userTypeLabel = userType === 'fisherman' ? 'Fisherman' : 'Customer';
  const userTypeIcon = userType === 'fisherman' ? '🎣' : '🛒';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={globalStyles.centered}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.emoji}>{userTypeIcon}</Text>
          <Text style={globalStyles.title}>
            {isLogin ? 'Login' : 'Register'} as {userTypeLabel}
          </Text>
          <Text style={globalStyles.subtitle}>
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </Text>

          {!isLogin && (
            <TextInput
              style={globalStyles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
          )}

          <TextInput
            style={globalStyles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TextInput
            style={globalStyles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={globalStyles.button} onPress={handleAuth}>
            <Text style={globalStyles.buttonText}>
              {isLogin ? 'Login' : 'Register'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text style={styles.switchText}>
              {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 20,
  },
  switchText: {
    color: colors.primary,
    fontSize: 14,
  },
});

export default AuthScreen;