import React from 'react';
import { StatusBar, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ExpensesContextProvider } from './src/store/expenses-context';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';
import { theme } from './src/constants/theme';

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ExpenseOverview() {
  const colorScheme = useColorScheme() || 'light';
  const colors = theme[colorScheme];

  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.bgSecondary },
        headerTintColor: colors.textPrimary,
        tabBarStyle: { backgroundColor: colors.bgSecondary },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => navigation.navigate('GerenciarDespesa')}
          >
            <Text style={{ fontSize: 24, color: colors.primary, fontWeight: 'bold' }}>+</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <BottomTabs.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{ title: 'Recentes' }}
      />
      <BottomTabs.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{ title: 'Todas as Despesas' }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  const colorScheme = useColorScheme() || 'light';
  const colors = theme[colorScheme];

  return (
    <ExpensesContextProvider>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.bgSecondary },
            headerTintColor: colors.textPrimary,
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpenseOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}
