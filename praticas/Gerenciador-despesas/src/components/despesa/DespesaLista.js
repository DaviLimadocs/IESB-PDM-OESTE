import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas }) {
  if (!despesas || despesas.length === 0) {
    return (
      <View style={styles.vazioContainer}>
        <Text style={styles.vazioText}>Nenhuma despesa encontrada.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DespesaItem
          descricao={item.descricao}
          valor={item.valor}
          data={item.data}
          categoria={item.categoria}
        />
      )}
      contentContainerStyle={styles.listaContainer}
    />
  );
}

const styles = StyleSheet.create({
  listaContainer: {
    paddingBottom: 20,
  },
  vazioContainer: {
    padding: 20,
    alignItems: 'center',
  },
  vazioText: {
    color: '#888888',
    fontSize: 14,
  },
});