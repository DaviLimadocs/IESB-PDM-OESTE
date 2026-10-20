import React from 'react';
import { useExpenses } from '../store/expenses-context';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes({ navigation }) {
  const { expenses } = useExpenses();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const expenseDate = new Date(expense.date);
    const date7DaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return expenseDate >= date7DaysAgo && expenseDate <= today;
  });

  function handleSelectExpense(expenseId) {
    navigation.navigate('GerenciarDespesa', { expenseId });
  }

  return (
    <DespesaSaida
      expenses={recentExpenses}
      periodName="Últimos 7 Dias"
      onSelectExpense={handleSelectExpense}
    />
  );
}
