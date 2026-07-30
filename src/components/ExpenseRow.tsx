import { Pressable, StyleSheet, View } from 'react-native';
import { Menu, Text } from 'react-native-paper';
import { useState } from 'react';
import { formatCurrency, formatShortDate } from '@/utils/format';
import { getCategoryColor } from '@/theme/colors';
import { colors } from '@/theme/colors';
import type { Expense } from '@/types';

interface ExpenseRowProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export function ExpenseRow({ expense, onEdit, onDelete }: ExpenseRowProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <Pressable
          onLongPress={() => setMenuVisible(true)}
          style={styles.row}
        >
          <View style={[styles.pill, { backgroundColor: getCategoryColor(expense.category) }]} />
          <View style={styles.details}>
            <Text style={styles.name} numberOfLines={1}>
              {expense.name || expense.category}
            </Text>
            <Text style={styles.meta}>
              {expense.category} · {formatShortDate(expense.date)}
            </Text>
          </View>
          <Text style={styles.amount}>{formatCurrency(expense.amount, expense.currency)}</Text>
        </Pressable>
      }
    >
      <Menu.Item
        onPress={() => {
          setMenuVisible(false);
          onEdit(expense);
        }}
        title="Edit"
      />
      <Menu.Item
        onPress={() => {
          setMenuVisible(false);
          onDelete(expense);
        }}
        title="Delete"
      />
    </Menu>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 8,
  },
  pill: {
    width: 8,
    height: 36,
    borderRadius: 4,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  amount: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
});
