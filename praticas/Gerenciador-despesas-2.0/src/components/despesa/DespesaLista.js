import React from 'react';
import { FlatList, View, Text, StyleSheet, useColorScheme } from 'react-native';
import DespesaItem from './DespesaItem';
import DespesaSumario from './DespesaSumario';
import { theme } from '../../constants/theme';

export default function DespesaLista({ expenses, periodName, onSelectExpense }) {
  const colorScheme = useColorScheme() || 'light';
  const colors = theme[colorScheme];

  function renderItem({ item }) {
    return (
      <DespesaItem
        id={item.id}
        description={item.description}
        amount={item.amount}
        date={item.date}
        category={item.category}
        onPress={() => onSelectExpense(item.id)}
      />
    );
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={<DespesaSumario expenses={expenses} periodName={periodName} />}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyIcon, { color: colors.textSecondary }]}>📂</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Nenhuma despesa encontrada.
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            Toque em + para adicionar um novo registro.
          </Text>
        </View>
      }
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});
