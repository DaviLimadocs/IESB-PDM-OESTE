import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

export default function GerenciarDespesa({ navigation, route }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleValorChange = (texto) => {
    // Regex para validar números com até duas casas decimais
    if (/^\d*\.?\d{0,2}$/.test(texto)) {
      setValor(texto);
    }
  };

  const handleDataChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setData(selectedDate);
    }
  };

  const salvarDespesa = () => {
    if (!descricao.trim() || !valor.trim() || !categoria) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha a descrição, valor e selecione uma categoria.');
      return;
    }

    const novaDespesa = {
      id: Math.random().toString(),
      descricao,
      valor: parseFloat(valor),
      categoria,
      data,
    };

    Alert.alert('Sucesso', 'Despesa cadastrada com sucesso!');
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Despesa</Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Almoço de negócios"
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={handleValorChange}
        keyboardType="decimal-pad"
        placeholder="0.00"
      />

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categoriasRow}>
        {CATEGORIAS.map((cat) => {
          const selecionado = categoria === cat;
          return (
            <Pressable
              key={cat}
              style={[styles.catBotao, selecionado && styles.catBotaoSelecionado]}
              onPress={() => setCategoria(cat)}
            >
              <Text style={[styles.catTexto, selecionado && styles.catTextoSelecionado]}>
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Data</Text>
      <Pressable style={styles.datePickerBtn} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePickerText}>{data.toLocaleDateString('pt-BR')}</Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={handleDataChange}
        />
      )}

      <Pressable style={styles.botaoSalvar} onPress={salvarDespesa}>
        <Text style={styles.botaoSalvarTexto}>Salvar Despesa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555555',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  categoriasRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  catBotao: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  catBotaoSelecionado: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  catTexto: {
    fontSize: 13,
    color: '#333333',
  },
  catTextoSelecionado: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  datePickerBtn: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
    color: '#333333',
  },
  botaoSalvar: {
    marginTop: 24,
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoSalvarTexto: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});