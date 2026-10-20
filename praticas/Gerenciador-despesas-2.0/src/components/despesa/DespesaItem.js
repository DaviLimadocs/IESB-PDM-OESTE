import React from 'react';
import { Pressable, View, Text, StyleSheet, Platform, useColorScheme } from 'react-native';
import { theme, CATEGORIES } from '../../constants/theme';

export default function DespesaItem({ id, description, amount, date, category, onPress }) {
  const colorScheme = useColorScheme() || 'light';
  const colors = theme[colorScheme];

  const categoryLabel = CATEGORIES.find((c) => c.id === category)?.label || category;
  const formattedDate = new Date(date).toLocaleDateString('pt-BR');

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.cardBg, borderColor: colors.border },
        Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          android: {
            elevation: 3,
          },
        }),
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.infoContainer}>
        <Text style={[styles.description, { color: colors.textPrimary }]}>{description}</Text>
        <Text style={[styles.category, { color: colors.textSecondary }]}>
          {categoryLabel} • {formattedDate}
        </Text>
      </View>
      <View style={[styles.amountContainer, { backgroundColor: colors.primaryLight }]}>
        <Text style={[styles.amount, { color: colors.primary }]}>
          R$ {Number(amount).toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  infoContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 10,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});