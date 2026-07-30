import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text as RNText, View } from 'react-native';
import { ActivityIndicator, FAB } from 'react-native-paper';
import { AddExpenseModal } from '@/components/AddExpenseModal';
import { ExpenseRow } from '@/components/ExpenseRow';
import { SortDropdown } from '@/components/SortDropdown';
import { useAuthStore } from '@/store/authStore';
import { sortExpenses, useExpenseStore } from '@/store/expenseStore';
import { useFetchExpenses } from '@/hooks/useFetchExpenses';
import { colors } from '@/theme/colors';
import type { Expense, ExpenseSortOption } from '@/types';

const SORT_OPTIONS: { value: ExpenseSortOption; label: string }[] = [
  { value: 'date_desc', label: 'Date (newest)' },
  { value: 'cost_desc', label: 'Cost (highest)' },
];

export default function Expenses() {
  const userId = useAuthStore((s) => s.user?.id);
  useFetchExpenses(userId);
  const expenses = useExpenseStore((s) => s.expenses);
  const loading = useExpenseStore((s) => s.loading);
  const sortOption = useExpenseStore((s) => s.sortOption);
  const setSortOption = useExpenseStore((s) => s.setSortOption);
  const addExpense = useExpenseStore((s) => s.addExpense);
  const editExpense = useExpenseStore((s) => s.editExpense);
  const removeExpense = useExpenseStore((s) => s.removeExpense);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const sorted = sortExpenses(expenses, sortOption);

  function handleAddPress() {
    setEditingExpense(null);
    setModalVisible(true);
  }

  function handleEditPress(expense: Expense) {
    setEditingExpense(expense);
    setModalVisible(true);
  }

  function handleDeletePress(expense: Expense) {
    Alert.alert('Delete expense', `Delete "${expense.name || expense.category}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => removeExpense(expense.id),
      },
    ]);
  }

  async function handleSubmit(input: Parameters<typeof addExpense>[1]) {
    if (!userId) return;
    if (editingExpense) {
      await editExpense(editingExpense.id, input);
    } else {
      await addExpense(userId, input);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SortDropdown options={SORT_OPTIONS} value={sortOption} onChange={setSortOption} />
      </View>

      {loading && expenses.length === 0 ? (
        <ActivityIndicator style={styles.loading} color={colors.primary} />
      ) : (
        <FlatList
          data={sorted}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <ExpenseRow expense={item} onEdit={handleEditPress} onDelete={handleDeletePress} />
          )}
          ListEmptyComponent={
            <RNText style={styles.empty}>No expenses yet. Tap + to add one.</RNText>
          }
        />
      )}

      <FAB
        style={styles.fab}
        icon={({ color, size }) => (
          <RNText style={{ color, fontSize: size, lineHeight: size }}>+</RNText>
        )}
        onPress={handleAddPress}
      />

      <AddExpenseModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        editingExpense={editingExpense}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  loading: {
    marginTop: 40,
  },
  empty: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 40,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
  },
});
