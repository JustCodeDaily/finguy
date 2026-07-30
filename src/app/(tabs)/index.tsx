import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import { IncomeModal } from '@/components/IncomeModal';
import { SummaryCard } from '@/components/SummaryCard';
import { useAuthStore } from '@/store/authStore';
import { debtsWithPercentKilled, sortDebts, useDebtStore } from '@/store/debtStore';
import { sumExpensesByCurrency, debtPaymentsInMonth } from '@/utils/calculate';
import { percentOfIncome } from '@/utils/calculate';
import { formatCurrency, currentMonthKey, currentMonthLabel } from '@/utils/format';
import { useFetchExpenses } from '@/hooks/useFetchExpenses';
import { useFetchDebts } from '@/hooks/useFetchDebts';
import { useFetchIncome } from '@/hooks/useFetchIncome';
import { useExpenseStore } from '@/store/expenseStore';
import { colors } from '@/theme/colors';

const SYMBOL_TO_CODE: Record<string, string> = { '₹': 'INR', '€': 'EUR' };

function joinAmounts(totals: Record<string, number>): string {
  const entries = Object.entries(totals);
  if (entries.length === 0) return '—';
  return entries.map(([currency, amount]) => formatCurrency(amount, currency)).join(' · ');
}

function percentLines(
  totals: Record<string, number>,
  incomeInr: number | null,
  incomeEur: number | null
): string | undefined {
  const parts: string[] = [];
  for (const [currency, amount] of Object.entries(totals)) {
    const code = SYMBOL_TO_CODE[currency] ?? currency;
    const income = code === 'INR' ? incomeInr : code === 'EUR' ? incomeEur : null;
    const pct = percentOfIncome(amount, income);
    if (pct != null) parts.push(`${pct.toFixed(0)}% of ${currency} income`);
  }
  return parts.length ? parts.join(' · ') : undefined;
}

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const userId = user?.id;

  useFetchExpenses(userId);
  useFetchDebts(userId);
  const { income, saveIncome } = useFetchIncome(userId);

  const expenses = useExpenseStore((s) => s.expenses);
  const debts = useDebtStore((s) => s.debts);
  const history = useDebtStore((s) => s.history);

  const [incomeModalVisible, setIncomeModalVisible] = useState(false);

  const monthKey = currentMonthKey();
  const monthPrefix = monthKey.slice(0, 7);

  const monthExpenses = useMemo(
    () => expenses.filter((e) => e.date.slice(0, 7) === monthPrefix),
    [expenses, monthPrefix]
  );
  const expenseTotals = useMemo(() => sumExpensesByCurrency(monthExpenses), [monthExpenses]);

  const currencyByDebtId = useMemo(
    () => Object.fromEntries(debts.map((d) => [d.id, d.currency])),
    [debts]
  );
  const debtPaymentTotals = useMemo(
    () => debtPaymentsInMonth(history, monthKey, currencyByDebtId),
    [history, monthKey, currencyByDebtId]
  );

  const incomeTotals: Record<string, number> = {};
  if (income?.income_inr) incomeTotals['₹'] = income.income_inr;
  if (income?.income_eur) incomeTotals['€'] = income.income_eur;

  const topDebts = useMemo(
    () => sortDebts(debtsWithPercentKilled(debts, history), 'balance_desc').slice(0, 3),
    [debts, history]
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineSmall" style={styles.greeting}>
        Hi, {user?.email?.split('@')[0] ?? 'there'}
      </Text>
      <Text style={styles.monthLabel}>{currentMonthLabel()}</Text>

      <Pressable style={styles.incomeBadge} onPress={() => setIncomeModalVisible(true)}>
        <Text style={styles.incomeBadgeText}>
          {joinAmounts(incomeTotals)} this month
        </Text>
        <Text style={styles.incomeBadgeHint}>Tap to edit</Text>
      </Pressable>

      <SummaryCard
        label="Income"
        value={joinAmounts(incomeTotals)}
        accentColor={colors.success}
      />
      <SummaryCard
        label="Expenses"
        value={joinAmounts(expenseTotals)}
        subValue={percentLines(expenseTotals, income?.income_inr ?? null, income?.income_eur ?? null)}
        accentColor={colors.warning}
      />
      <SummaryCard
        label="Debt Payment"
        value={joinAmounts(debtPaymentTotals)}
        subValue={percentLines(debtPaymentTotals, income?.income_inr ?? null, income?.income_eur ?? null)}
        accentColor={colors.danger}
      />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Top Debts
      </Text>
      {topDebts.length === 0 ? (
        <Text style={styles.empty}>No debts yet.</Text>
      ) : (
        topDebts.map((debt) => (
          <Pressable
            key={debt.id}
            style={styles.debtRow}
            onPress={() => router.push('/debts')}
          >
            <View>
              <Text style={styles.debtName}>{debt.name}</Text>
              <Text style={styles.debtMeta}>{debt.percentKilled.toFixed(0)}% killed</Text>
            </View>
            <Text style={styles.debtBalance}>
              {formatCurrency(debt.current_balance, debt.currency)}
            </Text>
          </Pressable>
        ))
      )}

      <IncomeModal
        visible={incomeModalVisible}
        onDismiss={() => setIncomeModalVisible(false)}
        onSubmit={saveIncome}
        income={income}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  greeting: {
    color: colors.text,
  },
  monthLabel: {
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 16,
  },
  incomeBadge: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  incomeBadgeText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  incomeBadgeHint: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
  sectionTitle: {
    color: colors.text,
    marginTop: 8,
    marginBottom: 12,
  },
  empty: {
    color: colors.textMuted,
  },
  debtRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  debtName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  debtMeta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  debtBalance: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
});
