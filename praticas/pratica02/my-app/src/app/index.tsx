import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Programação para Dispositivos Móveis</Text>
      
      
      <Text style={styles.subtitle}>Olá, [Davi Lima]!</Text>
      
      <Text style={styles.body}>Meu segundo passo com Expo e React Native</Text>
    </View>
  );
}

// Estilos básicos para organizar a tela (opcional nesta etapa, mas recomendado)
const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz a View ocupar a tela inteira
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: '#f5f5f5', // Cor de fundo leve
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  }
});