import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => {
    return acumulador + Number(item.valor || 0);
  }, 0);

  const valorUltrapassado = somaDespesas > 200;

  return (
    <View style={styles.container}>
      <Text style={styles.periodoText}>{periodo}</Text>
      <Text style={[styles.somaText, valorUltrapassado && styles.somaAlerta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  periodoText: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '500',
  },
  somaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  somaAlerta: {
    color: '#d32f2f',
  },
});