import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as labels from './labels';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [textoInput, setTextoInput] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // Load: Carrega os dados do AsyncStorage ao montar
  useEffect(() => {
    async function carregarDados() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados !== null) {
          setCompromissos(JSON.parse(dados));
        }
      } catch (error) {
        Alert.alert('Erro', 'Falha ao carregar dados salvos.');
      } finally {
        setCarregado(true);
      }
    }
    carregarDados();
  }, []);

  // Save: Salva no AsyncStorage sempre que a lista muda (após carga inicial)
  useEffect(() => {
    async function salvarDados() {
      if (!carregado) return;
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (error) {
        Alert.alert('Erro', 'Falha ao salvar dados.');
      }
    }
    salvarDados();
  }, [compromissos, carregado]);

  const adicionarCompromisso = () => {
    if (!textoInput.trim()) {
      Alert.alert('Atenção', 'Digite uma descrição para o compromisso.');
      return;
    }

    const novoItem = {
      id: Date.now().toString(),
      texto: textoInput.trim(),
      criadoEm: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setCompromissos((prev) => [novoItem, ...prev]);
    setTextoInput('');
  };

  const removerCompromisso = (id) => {
    setCompromissos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./assets/icon.png')} style={styles.logo} />
          <Text style={styles.title}>{labels.tituloApp}</Text>
        </View>

        <CompromissoInput
          value={textoInput}
          onChangeText={setTextoInput}
          onAdd={adicionarCompromisso}
          labels={labels}
        />

        <CompromissoList
          itens={compromissos}
          onDelete={removerCompromisso}
          tituloLista={`${labels.tituloLista} (${compromissos.length} pendente(s))`}
          listaVazia={labels.listaVazia}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
  },
});