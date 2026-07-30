import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text as RNText, View } from 'react-native';
import { ActivityIndicator, FAB } from 'react-native-paper';
import { AddDebtModal } from '@/components/AddDebtModal';
import { DebtCard } from '@/components/DebtCard';
import { SortDropdown } from '@/components/SortDropdown';
import { UpdateBalanceModal } from '@/components/UpdateBalanceModal';
import { useAuthStore } from '@/store/authStore';
import { debtsWithPercentKilled, sortDebts, useDebtStore } from '@/store/debtStore';
import { useFetchDebts } from '@/hooks/useFetchDebts';
import { colors } from '@/theme/colors';
import type { Debt, DebtInput, DebtSortOption } from '@/types';

const SORT_OPTIONS: { value: DebtSortOption; label: string }[] = [
  { value: 'name_asc', label: 'Name' },
  { value: 'rate_desc', label: 'ROI (highest)' },
  { value: 'balance_desc', label: 'Remaining (highest)' },
];

export default function Debts() {
  const userId = useAuthStore((s) => s.user?.id);
  useFetchDebts(userId);
  const debts = useDebtStore((s) => s.debts);
  const history = useDebtStore((s) => s.history);
  const loading = useDebtStore((s) => s.loading);
  const sortOption = useDebtStore((s) => s.sortOption);
  const setSortOption = useDebtStore((s) => s.setSortOption);
  const addDebt = useDebtStore((s) => s.addDebt);
  const editDebtDetails = useDebtStore((s) => s.editDebtDetails);
  const updateBalance = useDebtStore((s) => s.updateBalance);
  const removeDebt = useDebtStore((s) => s.removeDebt);

  const [formModalVisible, setFormModalVisible] = useState(false);
  const [balanceModalVisible, setBalanceModalVisible] = useState(false);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [balanceDebt, setBalanceDebt] = useState<Debt | null>(null);

  const withPercent = debtsWithPercentKilled(debts, history);
  const sorted = sortDebts(withPercent, sortOption);

  function handleAddPress() {
    setEditingDebt(null);
    setFormModalVisible(true);
  }

  function handleEditPress(debt: Debt) {
    setEditingDebt(debt);
    setFormModalVisible(true);
  }

  function handleCardPress(debt: Debt) {
    setBalanceDebt(debt);
    setBalanceModalVisible(true);
  }

  function handleDeletePress(debt: Debt) {
    Alert.alert('Delete debt', `Delete "${debt.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeDebt(debt.id) },
    ]);
  }

  async function handleFormSubmit(input: DebtInput) {
    if (!userId) return;
    if (editingDebt) {
      const { current_balance: _currentBalance, ...rest } = input;
      await editDebtDetails(editingDebt.id, rest);
    } else {
      await addDebt(userId, input);
    }
  }

  async function handleBalanceSubmit(newBalance: number) {
    if (!userId || !balanceDebt) return;
    await updateBalance(userId, balanceDebt, newBalance);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SortDropdown options={SORT_OPTIONS} value={sortOption} onChange={setSortOption} />
      </View>

      {loading && debts.length === 0 ? (
        <ActivityIndicator style={styles.loading} color={colors.primary} />
      ) : (
        <FlatList
          data={sorted}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <DebtCard
              debt={item}
              onPress={handleCardPress}
              onEdit={handleEditPress}
              onDelete={handleDeletePress}
            />
          )}
          ListEmptyComponent={
            <RNText style={styles.empty}>No debts yet. Tap + to add one.</RNText>
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

      <AddDebtModal
        visible={formModalVisible}
        onDismiss={() => setFormModalVisible(false)}
        onSubmit={handleFormSubmit}
        editingDebt={editingDebt}
      />
      <UpdateBalanceModal
        visible={balanceModalVisible}
        onDismiss={() => setBalanceModalVisible(false)}
        onSubmit={handleBalanceSubmit}
        debt={balanceDebt}
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
