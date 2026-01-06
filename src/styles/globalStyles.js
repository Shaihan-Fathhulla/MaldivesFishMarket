import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#0077BE',
  secondary: '#00A8E8',
  accent: '#FF6B35',
  success: '#4CAF50',
  danger: '#F44336',
  warning: '#FF9800',
  background: '#F5F9FC',
  white: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  border: '#DDDDDD',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: colors.white,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 30,
    textAlign: 'center',
  },
});