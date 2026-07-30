import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { format } from 'date-fns';
import { isValidAmount, isNonEmpty } from '@/utils/validate';
import { colors } from '@/theme/colors';
import type { Expense, ExpenseInput } from '@/types';

interface AddExpenseModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (input: ExpenseInput) => Promise<void>;
  editingExpense: Expense | null;
}

const DEFAULT_CURRENCY = '₹';

export function AddExpenseModal({
  visible,
  onDismiss,
  onSubmit,
  editingExpense,
}: AddExpenseModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      setName(editingExpense?.name ?? '');
      setCategory(editingExpense?.category ?? '');
      setAmount(editingExpense ? String(editingExpense.amount) : '');
      setCurrency(editingExpense?.currency ?? DEFAULT_CURRENCY);
      setDate(editingExpense?.date ?? format(new Date(), 'yyyy-MM-dd'));
      setError(null);
    }
  }, [visible, editingExpense]);

  const canSubmit = isNonEmpty(category) && isValidAmount(amount) && isNonEmpty(date);

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        name: name.trim() || null,
        category: category.trim(),
        amount: Number(amount),
        currency,
        date,
      });
      onDismiss();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Text variant="titleLarge" style={styles.title}>
          {editingExpense ? 'Edit Expense' : 'Add Expense'}
        </Text>

        <TextInput
          mode="outlined"
          label="Name (optional)"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Category"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
        />
        <View style={styles.row}>
          <TextInput
            mode="outlined"
            label="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={[styles.input, styles.flex1, styles.marginRight]}
          />
          <TextInput
            mode="outlined"
            label="Currency"
            value={currency}
            onChangeText={setCurrency}
            style={[styles.input, styles.currencyInput]}
          />
        </View>
        <TextInput
          mode="outlined"
          label="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />

        {error && (
          <Text style={styles.error} variant="bodySmall">
            {error}
          </Text>
        )}

        <View style={styles.actions}>
          <Button mode="text" onPress={onDismiss} disabled={submitting}>
            Cancel
          </Button>
          <Button mode="contained" onPress={handleSubmit} loading={submitting} disabled={!canSubmit}>
            Save
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
  },
  title: {
    color: colors.text,
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  marginRight: {
    marginRight: 8,
  },
  currencyInput: {
    width: 90,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 8,
  },
  error: {
    color: colors.danger,
    marginBottom: 8,
  },
});
