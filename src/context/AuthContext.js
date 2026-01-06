import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading users:', error);
      setIsLoading(false);
    }
  };

  const saveUsers = async (updatedUsers) => {
    try {
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error saving users:', error);
    }
  };

  const register = async (userType, fullName, username, password) => {
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      userType,
      fullName,
      username,
      password,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    await saveUsers(updatedUsers);
    
    return { success: true, message: 'Registration successful' };
  };

  const login = async (username, password, userType) => {
    const user = users.find(
      u => u.username === username && u.password === password && u.userType === userType
    );

    if (user) {
      setCurrentUser(user);
      return { success: true, message: 'Login successful' };
    }

    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);