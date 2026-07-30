import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { isNonEmpty, isValidAmount } from '@/utils/validate';
import { colors } from '@/theme/colors';
import type { Debt, DebtInput } from '@/types';

interface AddDebtModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (input: DebtInput) => Promise<void>;
  editingDebt: Debt | null;
}

const DEFAULT_CURRENCY = '₹';

export function AddDebtModal({
  visible,
  onDismiss,
  onSubmit,
  editingDebt,
}: AddDebtModalProps) {
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [balance, setBalance] = useState('');
  const [rate, setRate] = useState('');
  const [emiPending, setEmiPending] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      setName(editingDebt?.name ?? '');
      setCurrency(editingDebt?.currency ?? DEFAULT_CURRENCY);
      setBalance(editingDebt ? String(editingDebt.current_balance) : '');
      setRate(editingDebt ? String(editingDebt.rate) : '');
      setEmiPending(editingDebt ? String(editingDebt.emi_pending) : '');
      setError(null);
    }
  }, [visible, editingDebt]);

  const canSubmit =
    isNonEmpty(name) &&
    (editingDebt || isValidAmount(balance)) &&
    isNonEmpty(rate) &&
    isNonEmpty(emiPending);

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        name: name.trim(),
        currency,
        current_balance: editingDebt ? editingDebt.current_balance : Number(balance),
        rate: Number(rate),
        emi_pending: Number(emiPending),
        sort_order: editingDebt?.sort_order ?? 0,
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
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <Text variant="titleLarge" style={styles.title}>
          {editingDebt ? 'Edit Debt' : 'Add Debt'}
        </Text>

        <TextInput
          mode="outlined"
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <View style={styles.row}>
          <TextInput
            mode="outlined"
            label="Balance"
            keyboardType="numeric"
            value={balance}
            onChangeText={setBalance}
            editable={!editingDebt}
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
        {editingDebt && (
          <Text style={styles.hint}>
            Use "Update Balance" on the card to change the balance (keeps history).
          </Text>
        )}
        <View style={styles.row}>
          <TextInput
            mode="outlined"
            label="ROI %"
            keyboardType="numeric"
            value={rate}
            onChangeText={setRate}
            style={[styles.input, styles.flex1, styles.marginRight]}
          />
          <TextInput
            mode="outlined"
            label="EMIs pending"
            keyboardType="numeric"
            value={emiPending}
            onChangeText={setEmiPending}
            style={[styles.input, styles.flex1]}
          />
        </View>

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
  hint: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 12,
    marginTop: -6,
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
