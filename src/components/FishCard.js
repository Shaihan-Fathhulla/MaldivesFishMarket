import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

const FishCard = ({ fish, onEdit, onDelete, onAddToCart, showActions, isSold }) => {
  return (
    <View style={[styles.card, isSold && styles.soldCard]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.fishName}>{fish.fishName}</Text>
          <Text style={styles.fishermanName}>by {fish.fishermanName}</Text>
        </View>
        {isSold && (
          <View style={styles.soldBadge}>
            <Text style={styles.soldText}>SOLD</Text>
          </View>
        )}
      </View>
      
      <View style={styles.details}>
        <Text style={styles.detailText}>⚖️ Weight: {fish.weight} kg</Text>
        <Text style={styles.detailText}>💰 Price: MVR {fish.price}</Text>
      </View>

      {showActions && !isSold && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => onEdit(fish)}
          >
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => onDelete(fish)}
          >
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      {onAddToCart && !isSold && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => onAddToCart(fish)}
        >
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  soldCard: {
    opacity: 0.6,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  fishName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  fishermanName: {
    fontSize: 14,
    color: colors.textLight,
  },
  soldBadge: {
    backgroundColor: colors.danger,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  soldText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  details: {
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: colors.secondary,
  },
  deleteButton: {
    backgroundColor: colors.danger,
  },
  actionButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cartButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FishCard;