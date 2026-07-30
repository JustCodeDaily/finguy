import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { isValidAmount } from '@/utils/validate';
import { formatCurrency } from '@/utils/format';
import { colors } from '@/theme/colors';
import type { Debt } from '@/types';

interface UpdateBalanceModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (newBalance: number) => Promise<void>;
  debt: Debt | null;
}

export function UpdateBalanceModal({
  visible,
  onDismiss,
  onSubmit,
  debt,
}: UpdateBalanceModalProps) {
  const [balance, setBalance] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible && debt) {
      setBalance(String(debt.current_balance));
      setError(null);
    }
  }, [visible, debt]);

  const canSubmit = isValidAmount(balance) || balance.trim() === '0';

  async function handleSubmit() {
    if (!debt || !canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(Number(balance));
      onDismiss();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  if (!debt) return null;

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <Text variant="titleLarge" style={styles.title}>
          Update Balance
        </Text>
        <Text style={styles.subtitle}>
          {debt.name} · Current: {formatCurrency(debt.current_balance, debt.currency)}
        </Text>

        <TextInput
          mode="outlined"
          label="New balance"
          keyboardType="numeric"
          value={balance}
          onChangeText={setBalance}
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
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textMuted,
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
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
