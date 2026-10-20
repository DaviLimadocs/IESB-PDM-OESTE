import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { theme } from '../../constants/theme';

export default function DespesaSumario({ expenses, periodName }) {
  const colorScheme = useColorScheme() || 'light';
  const colors = theme[colorScheme];

  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryLight }]}>
      <Text style={[styles.period, { color: colors.textSecondary }]}>
        {periodName} ({expenses.length})
      </Text>
      <Text style={[styles.sum, { color: colors.primary }]}>
        R$ {total.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  period: {
    fontSize: 14,
    fontWeight: '500',
  },
  sum: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
