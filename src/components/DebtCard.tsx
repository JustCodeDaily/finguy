import { Pressable, StyleSheet, View } from 'react-native';
import { Menu, ProgressBar, Text } from 'react-native-paper';
import { useState } from 'react';
import { formatCurrency } from '@/utils/format';
import { colors } from '@/theme/colors';
import type { Debt } from '@/types';

interface DebtCardProps {
  debt: Debt & { percentKilled: number };
  onPress: (debt: Debt) => void;
  onEdit: (debt: Debt) => void;
  onDelete: (debt: Debt) => void;
}

export function DebtCard({ debt, onPress, onEdit, onDelete }: DebtCardProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <Pressable
          onPress={() => onPress(debt)}
          onLongPress={() => setMenuVisible(true)}
          style={styles.card}
        >
          <View style={styles.headerRow}>
            <Text style={styles.name}>{debt.name}</Text>
            <Text style={styles.balance}>
              {formatCurrency(debt.current_balance, debt.currency)}
            </Text>
          </View>
          <Text style={styles.meta}>
            {debt.emi_pending} EMIs @ {debt.rate}% ROI
          </Text>
          <ProgressBar
            progress={debt.percentKilled / 100}
            color={colors.success}
            style={styles.progress}
          />
          <Text style={styles.percent}>{debt.percentKilled.toFixed(0)}% killed</Text>
        </Pressable>
      }
    >
      <Menu.Item
        onPress={() => {
          setMenuVisible(false);
          onEdit(debt);
        }}
        title="Edit"
      />
      <Menu.Item
        onPress={() => {
          setMenuVisible(false);
          onDelete(debt);
        }}
        title="Delete"
      />
    </Menu>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  balance: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  progress: {
    height: 8,
    borderRadius: 4,
  },
  percent: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 6,
  },
});
