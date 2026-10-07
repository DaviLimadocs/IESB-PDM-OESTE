import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DespesasContextProvider from './src/context/DespesasContext';
import DespesasRecentes from './src/screens/DespesasRecentes';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function DespesasVisaoGeral() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#1976d2' },
        headerTintColor: '#ffffff',
        tabBarActiveTintColor: '#1976d2',
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate('GerenciarDespesa')}
            style={({ pressed }) => [styles.headerBotao, pressed && styles.pressed]}
          >
            <Ionicons name="add" size={24} color="white" />
          </Pressable>
        ),
      })}
    >
      <BottomTabs.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Recentes',
          headerTitle: 'Despesas Recentes',
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass-outline" size={size} color={color} />,
        }}
      />
      <BottomTabs.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas',
          headerTitle: 'Todas as Despesas',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <DespesasContextProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1976d2' }, headerTintColor: '#ffffff' }}>
          <Stack.Screen name="DespesasVisaoGeral" component={DespesasVisaoGeral} options={{ headerShown: false }} />
          <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} options={{ title: 'Gerenciar Despesa', presentation: 'modal' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </DespesasContextProvider>
  );
}

const styles = StyleSheet.create({
  headerBotao: { marginRight: 16, padding: 4 },
  pressed: { opacity: 0.7 },
});