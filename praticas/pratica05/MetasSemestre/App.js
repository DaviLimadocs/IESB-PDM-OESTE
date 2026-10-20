import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [metas, setMetas] = useState([]);
  const [isReady, setIsReady] = useState(false);

  // 1. CARREGAR metas (Executa apenas uma vez na montagem)
  useEffect(() => {
    const loadMetas = async () => {
      try {
        const storedMetas = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedMetas) {
          setMetas(JSON.parse(storedMetas));
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as metas.');
        console.error(error);
      } finally {
        setIsReady(true);
      }
    };
    loadMetas();
  }, []);

  // 2. SALVAR metas (Executa sempre que o array 'metas' muda)
  useEffect(() => {
    const saveMetas = async () => {
      // isReady evita que o array vazio inicial sobrescreva os dados salvos antes do carregamento
      if (!isReady) return; 
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível salvar as metas.');
        console.error(error);
      }
    };
    saveMetas();
  }, [metas, isReady]);

  const handleAddMeta = () => {
    if (inputText.trim() === '') {
      Alert.alert('Atenção', 'O texto da meta não pode ser vazio!');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: inputText,
      criadaEm: new Date().toLocaleDateString('pt-BR'),
      concluida: false, // Desafio opcional
    };

    // Cria um novo array (não muta o original)
    setMetas((metasAtuais) => [...metasAtuais, novaMeta]);
    setInputText('');
  };

  const handleDeleteMeta = (id) => {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  };

  const handleToggleMeta = (id) => {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  };

  // Desafio Opcional: Contadores
  const metasPendentes = metas.filter(m => !m.concluida).length;
  const metasConcluidas = metas.filter(m => m.concluida).length;

  if (!isReady) return null; // Evita renderizar antes de carregar os dados

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          {/* Substitua a URI por require('./assets/icone.png') se tiver uma imagem local */}
          <Image
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            style={styles.logo}
          />
          <View>
            <Text style={styles.title}>Metas do Semestre</Text>
            <Text style={styles.counter}>
              {metasPendentes} pendentes / {metasConcluidas} concluídas
            </Text>
          </View>
        </View>

        <MetaInput
          value={inputText}
          onChangeText={setInputText}
          onAdd={handleAddMeta}
        />

        <MetaList
          metas={metas}
          onDelete={handleDeleteMeta}
          onToggle={handleToggleMeta}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  counter: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
});