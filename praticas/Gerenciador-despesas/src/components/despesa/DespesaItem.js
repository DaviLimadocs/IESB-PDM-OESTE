import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getDataFormatada = (data) => {
  if (!(data instanceof Date)) {
    data = new Date(data);
  }
  return data.toLocaleDateString('pt-BR');
};

export default function DespesaItem({ descricao, valor, data, categoria }) {
  return (
    <View style={styles.container}>
      <View style={styles.infoEsquerda}>
        <Text style={styles.descricao}>{descricao}</Text>
        <View style={styles.detalhesRow}>
          <Text style={styles.dataText}>{getDataFormatada(data)}</Text>
          {categoria ? (
            <View style={styles.categoriaTag}>
              <Text style={styles.categoriaText}>{categoria}</Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.valorContainer}>
        <Text style={styles.valorText}>R$ {Number(valor).toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  infoEsquerda: {
    flex: 1,
    marginRight: 8,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  detalhesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dataText: {
    fontSize: 12,
    color: '#666666',
  },
  categoriaTag: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  categoriaText: {
    fontSize: 11,
    color: '#444444',
    fontWeight: '500',
  },
  valorContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f4f8',
    borderRadius: 6,
    minWidth: 90,
    alignItems: 'flex-end',
  },
  valorText: {
    color: '#2b5c8f',
    fontWeight: 'bold',
    fontSize: 14,
  },
});