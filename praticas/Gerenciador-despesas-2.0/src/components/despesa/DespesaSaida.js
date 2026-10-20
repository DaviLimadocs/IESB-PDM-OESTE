import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import DespesaLista from './DespesaLista';
import { theme } from '../../constants/theme';

export default function DespesaSaida({ expenses, periodName, onSelectExpense }) {
  const colorScheme = useColorScheme() || 'light';
  const colors = theme[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <DespesaLista
        expenses={expenses}
        periodName={periodName}
        onSelectExpense={onSelectExpense}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
