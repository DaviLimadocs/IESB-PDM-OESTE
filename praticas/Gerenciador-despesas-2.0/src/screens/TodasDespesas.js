import React, { useState, useMemo } from 'react';
import { View, TextInput, StyleSheet, useColorScheme } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { useDebounce } from '../hooks/useDebounce';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { theme } from '../constants/theme';

export default function TodasDespesas({ navigation }) {
  const { expenses } = useExpenses();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const colorScheme = useColorScheme() || 'light';
  const colors = theme[colorScheme];

  const filteredExpenses = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return expenses;
    return expenses.filter((exp) =>
      exp.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [expenses, debouncedSearchTerm]);

  function handleSelectExpense(expenseId) {
    navigation.navigate('GerenciarDespesa', { expenseId });
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: colors.inputBg,
              color: colors.textPrimary,
              borderColor: colors.border,
            },
          ]}
          placeholder="Buscar despesa por descrição..."
          placeholderTextColor={colors.textSecondary}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <DespesaSaida
        expenses={filteredExpenses}
        periodName="Total Geral"
        onSelectExpense={handleSelectExpense}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  searchInput: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
});
