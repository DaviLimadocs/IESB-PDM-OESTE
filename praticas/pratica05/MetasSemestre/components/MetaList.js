import React from 'react';
import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

export default function MetaList({ metas, onDelete, onToggle }) {
  const renderItem = ({ item }) => (
    <View style={[styles.card, item.concluida && styles.cardConcluido]}>
      {/* Clicar na área do texto alterna o status de concluída */}
      <Pressable style={styles.contentArea} onPress={() => onToggle(item.id)}>
        <Text style={[styles.texto, item.concluida && styles.textoConcluido]}>
          {item.texto}
        </Text>
        <Text style={styles.data}>Criada em: {item.criadaEm}</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.deleteButton, pressed && styles.deleteButtonPressed]}
        onPress={() => onDelete(item.id)}
        android_ripple={{ color: '#ff4d4d' }}
      >
        <Text style={styles.deleteText}>X</Text>
      </Pressable>
    </View>
  );

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma meta cadastrada.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardConcluido: {
    backgroundColor: '#e6ffe6',
  },
  contentArea: {
    flex: 1,
    padding: 15,
  },
  texto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  data: {
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#ff3333',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonPressed: {
    opacity: 0.7,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
});