import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useExpenses } from '../store/expenses-context';
import { theme, CATEGORIES } from '../constants/theme';

export default function GerenciarDespesa({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const selectedExpense = expenses.find((exp) => exp.id === editedExpenseId);

  const colorScheme = useColorScheme() || 'light';
  const colors = theme[colorScheme];

  const [form, setForm] = useState({
    description: selectedExpense ? selectedExpense.description : '',
    amount: selectedExpense ? String(selectedExpense.amount) : '',
    date: selectedExpense ? new Date(selectedExpense.date) : new Date(),
    category: selectedExpense ? selectedExpense.category : '',
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar Despesa' : 'Nova Despesa',
    });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  }

  function handleAmountChange(text) {
    const formatted = text.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(formatted)) {
      handleChange('amount', formatted);
    }
  }

  function validate(values) {
    const newErrors = {};

    if (!values.description || values.description.trim().length < 3) {
      newErrors.description = 'A descrição deve ter pelo menos 3 caracteres.';
    }

    const parsedAmount = parseFloat(values.amount);
    if (!values.amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = 'Informe um valor maior que zero.';
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (!values.date || new Date(values.date) > today) {
      newErrors.date = 'A data não pode ser futura.';
    }

    if (!values.category) {
      newErrors.category = 'Selecione uma categoria.';
    }

    return newErrors;
  }

  function handleSubmit() {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const expenseData = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date.toISOString(),
      category: form.category,
    };

    if (isEditing) {
      updateExpense(editedExpenseId, expenseData);
    } else {
      addExpense(expenseData);
    }

    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert('Confirmar Exclusão', 'Deseja realmente excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(editedExpenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  const selectedCategoryLabel =
    CATEGORIES.find((c) => c.id === form.category)?.label || 'Selecione a categoria';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: colors.bgPrimary }]}
      >
        {/* Descrição */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Descrição</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.inputBg, color: colors.textPrimary, borderColor: colors.border },
              errors.description && { borderColor: colors.danger },
            ]}
            value={form.description}
            onChangeText={(val) => handleChange('description', val)}
            placeholder="Ex: Almoço de negócios"
            placeholderTextColor={colors.textSecondary}
          />
          {errors.description && <Text style={[styles.errorText, { color: colors.danger }]}>{errors.description}</Text>}
        </View>

        {/* Valor */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Valor (R$)</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.inputBg, color: colors.textPrimary, borderColor: colors.border },
              errors.amount && { borderColor: colors.danger },
            ]}
            value={form.amount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor={colors.textSecondary}
          />
          {errors.amount && <Text style={[styles.errorText, { color: colors.danger }]}>{errors.amount}</Text>}
        </View>

        {/* Data */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Data</Text>
          <TouchableOpacity
            style={[
              styles.input,
              styles.pickerTrigger,
              { backgroundColor: colors.inputBg, borderColor: colors.border },
              errors.date && { borderColor: colors.danger },
            ]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: colors.textPrimary }}>
              {form.date.toLocaleDateString('pt-BR')}
            </Text>
          </TouchableOpacity>
          {errors.date && <Text style={[styles.errorText, { color: colors.danger }]}>{errors.date}</Text>}
          {showDatePicker && (
            <DateTimePicker
              value={form.date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) handleChange('date', selectedDate);
              }}
            />
          )}
        </View>

        {/* Categoria */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Categoria</Text>
          <TouchableOpacity
            style={[
              styles.input,
              styles.pickerTrigger,
              { backgroundColor: colors.inputBg, borderColor: colors.border },
              errors.category && { borderColor: colors.danger },
            ]}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={{ color: form.category ? colors.textPrimary : colors.textSecondary }}>
              {selectedCategoryLabel}
            </Text>
          </TouchableOpacity>
          {errors.category && <Text style={[styles.errorText, { color: colors.danger }]}>{errors.category}</Text>}
        </View>

        {/* Botões de Ação */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton, { borderColor: colors.border }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.buttonText, { color: colors.textSecondary }]}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
              {isEditing ? 'Salvar' : 'Adicionar'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Excluir */}
        {isEditing && (
          <TouchableOpacity
            style={[styles.deleteButton, { backgroundColor: colors.danger }]}
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>Excluir Despesa</Text>
          </TouchableOpacity>
        )}

        {/* Modal de Categorias */}
        <Modal visible={showCategoryModal} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.cardBg }]}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
                Selecione a Categoria
              </Text>
              <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.modalItem, { borderBottomColor: colors.border }]}
                    onPress={() => {
                      handleChange('category', item.id);
                      setShowCategoryModal(false);
                    }}
                  >
                    <Text style={[styles.modalItemText, { color: colors.textPrimary }]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={[styles.modalCloseButton, { backgroundColor: colors.border }]}
                onPress={() => setShowCategoryModal(false)}
              >
                <Text style={{ color: colors.textPrimary }}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  pickerTrigger: {
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: 24,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 16,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
