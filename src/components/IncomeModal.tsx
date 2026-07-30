import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { colors } from '@/theme/colors';
import type { MonthlyIncome } from '@/types';

interface IncomeModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (incomeInr: number | null, incomeEur: number | null) => Promise<void>;
  income: MonthlyIncome | null;
}

export function IncomeModal({ visible, onDismiss, onSubmit, income }: IncomeModalProps) {
  const [incomeInr, setIncomeInr] = useState('');
  const [incomeEur, setIncomeEur] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      setIncomeInr(income?.income_inr != null ? String(income.income_inr) : '');
      setIncomeEur(income?.income_eur != null ? String(income.income_eur) : '');
      setError(null);
    }
  }, [visible, income]);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const inr = incomeInr.trim() === '' ? null : Number(incomeInr);
      const eur = incomeEur.trim() === '' ? null : Number(incomeEur);
      await onSubmit(inr, eur);
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
          Monthly Income
        </Text>

        <TextInput
          mode="outlined"
          label="Income (₹)"
          keyboardType="numeric"
          value={incomeInr}
          onChangeText={setIncomeInr}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Income (€)"
          keyboardType="numeric"
          value={incomeEur}
          onChangeText={setIncomeEur}
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
          <Button mode="contained" onPress={handleSubmit} loading={submitting}>
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
