import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

const CATEGORIAS_FILTRO = ['Todas', 'Alimentação', 'Transporte', 'Lazer', 'Contas'];

export default function DespesaSaida({ despesas, periodo }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const despesasFiltradas = categoriaSelecionada === 'Todas'
    ? despesas
    : despesas.filter((item) => item.categoria === categoriaSelecionada);

  return (
    <View style={styles.container}>
      <View style={styles.filtroWrapper}>
        <Text style={styles.labelFiltro}>Filtrar por Categoria:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtroContainer}>
          {CATEGORIAS_FILTRO.map((cat) => {
            const selecionada = categoriaSelecionada === cat;
            return (
              <Pressable
                key={cat}
                style={[styles.chip, selecionada && styles.chipSelecionado]}
                onPress={() => setCategoriaSelecionada(cat)}
              >
                <Text style={[styles.chipText, selecionada && styles.chipTextSelecionado]}>
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <DespesaSumario despesas={despesasFiltradas} periodo={periodo} />
      <DespesaLista despesas={despesasFiltradas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#f5f5f5',
  },
  filtroWrapper: {
    marginBottom: 12,
  },
  labelFiltro: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 6,
  },
  filtroContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },
  chipSelecionado: {
    backgroundColor: '#1976d2',
  },
  chipText: {
    fontSize: 12,
    color: '#333333',
  },
  chipTextSelecionado: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});