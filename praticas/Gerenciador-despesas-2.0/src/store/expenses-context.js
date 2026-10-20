import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: (expenseData) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, expenseData) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE': {
      const index = state.findIndex((exp) => exp.id === action.payload.id);
      if (index === -1) return state;
      const updatedList = [...state];
      updatedList[index] = { ...state[index], ...action.payload.data };
      return updatedList;
    }
    case 'DELETE':
      return state.filter((exp) => exp.id !== action.payload);
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
          const parsed = JSON.parse(stored);
          dispatch({ type: 'SET', payload: parsed });
        }
      } catch (error) {
        console.error('Erro ao carregar despesas do AsyncStorage:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadExpenses();
  }, []);

  useEffect(() => {
    async function saveExpenses() {
      if (!isLoaded) return;
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expensesState));
      } catch (error) {
        console.error('Erro ao salvar despesas no AsyncStorage:', error);
      }
    }
    saveExpenses();
  }, [expensesState, isLoaded]);

  function addExpense(expenseData) {
    const newExpense = {
      id: new Date().toISOString() + Math.random().toString(),
      ...expenseData,
    };
    dispatch({ type: 'ADD', payload: newExpense });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider');
  }
  return context;
}
