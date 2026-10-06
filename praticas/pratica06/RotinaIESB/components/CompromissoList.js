import React from 'react';
import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>{tituloLista}</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
            android_ripple={{ color: '#ffcdd2' }}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.itemText}>{item.texto}</Text>
            <Text style={styles.itemDate}>Criado em: {item.criadoEm}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{listaVazia}</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#003366',
  },
  itemPressed: {
    backgroundColor: '#ffebee',
  },
  itemText: {
    fontSize: 16,
  },
  itemDate: {
    fontSize: 10,
    color: '#888',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});