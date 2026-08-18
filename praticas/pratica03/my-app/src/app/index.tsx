
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      
      {/* 1. Cabeçalho */}
      <Text style={styles.headerTitle}>Minhas Tarefas</Text>

      {/* 2. Área de inserção (Row) */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Digite uma tarefa..." 
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* 3. Lista estática de cartões */}
      <View style={styles.listContainer}>
        
        {/* Cartão 1 */}
        <View style={styles.card}>
          <Text style={styles.cardText}>Estudar Flexbox e StyleSheet no React Native</Text>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Cartão 2 */}
        <View style={styles.card}>
          <Text style={styles.cardText}>Fazer commit da Prática 03</Text>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Cartão 3 (Testando quebra de linha) */}
        <View style={styles.card}>
          <Text style={styles.cardText}>Lembrar de tomar água e descansar os olhos após terminar a interface do To-Do List.</Text>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

// 💡 Estilização organizada com StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela inteira
    backgroundColor: '#F3F4F6', // Fundo cinza bem claro
    paddingTop: 60, // Afasta do topo (área da barra de status)
    paddingHorizontal: 20, // Afasta das laterais
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937', // Preto/Cinza escuro
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row', // Coloca o input e o botão lado a lado
    alignItems: 'center', // Centraliza verticalmente
    marginBottom: 30,
  },
  input: {
    flex: 1, // O input cresce para ocupar o espaço disponível
    height: 50,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10, // Espaço entre o input e o botão
  },
  addButton: {
    height: 50,
    width: 50,
    backgroundColor: '#3B82F6', // Azul
    justifyContent: 'center', // Centraliza o texto "+"
    alignItems: 'center',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  card: {
    flexDirection: 'row', // Texto e lixeira lado a lado
    justifyContent: 'space-between', // Joga o texto para a esquerda e o X para a direita
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000', // Sombra leve para destacar os cartões
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2, // Sombra no Android
  },
  cardText: {
    flex: 1, // Faz o texto respeitar o limite e quebrar linha antes do botão X
    fontSize: 16,
    color: '#374151',
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    color: '#EF4444', // Vermelho
    fontSize: 18,
    fontWeight: 'bold',
  },
});