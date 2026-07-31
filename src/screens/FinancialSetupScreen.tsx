import { PropsWithChildren, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenBackground } from '@/components/ScreenBackground';
import { TopAppBar } from '@/components/TopAppBar';
import { AppTextField } from '@/components/AppTextField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, radii, spacing } from '@/theme';

type SectionProps = PropsWithChildren<{
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}>;

function FinancialSection({ title, icon, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <MaterialCommunityIcons name={icon} size={18} color={colors.primary} />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <Pressable style={styles.addButton}>
          <MaterialCommunityIcons name="plus" size={16} color={colors.primary} />
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

function CurrencyValueRow({
  currency,
  valueLabel,
  value,
  onChangeValue,
}: {
  currency: string;
  valueLabel: string;
  value: string;
  onChangeValue: (text: string) => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.currencyField}>
        <Text style={styles.smallLabel}>CURRENCY</Text>
        <View style={styles.currencyPill}>
          <Text style={styles.currencyPillText}>{currency}</Text>
        </View>
      </View>
      <AppTextField
        label={valueLabel}
        value={value}
        onChangeText={onChangeValue}
        placeholder="0.00"
        keyboardType="decimal-pad"
        style={styles.valueField}
      />
    </View>
  );
}

export default function FinancialSetupScreen() {
  const [bankName, setBankName] = useState('');
  const [savingsBalance, setSavingsBalance] = useState('');

  const [voucherProvider, setVoucherProvider] = useState('');
  const [voucherValue, setVoucherValue] = useState('');

  const [loanName, setLoanName] = useState('');
  const [loanPrincipal, setLoanPrincipal] = useState('');
  const [loanRoi, setLoanRoi] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [loanEmisPaid, setLoanEmisPaid] = useState('');

  const [cardName, setCardName] = useState('');
  const [cardLimit, setCardLimit] = useState('');

  const handleSave = () => {
    Alert.alert('Financial Setup Saved', "You're all set! Your financial profile has been recorded.");
  };

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.flex} edges={['top', 'bottom']}>
        <TopAppBar />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.heading}>Financial Setup</Text>

          <FinancialSection title="Savings" icon="piggy-bank-outline">
            <AppTextField
              label="Bank Name"
              value={bankName}
              onChangeText={setBankName}
              placeholder="Global Reserve"
              style={styles.field}
            />
            <CurrencyValueRow
              currency="USD"
              valueLabel="BALANCE ($)"
              value={savingsBalance}
              onChangeValue={setSavingsBalance}
            />
          </FinancialSection>

          <FinancialSection title="Vouchers" icon="ticket-percent-outline">
            <AppTextField
              label="Provider"
              value={voucherProvider}
              onChangeText={setVoucherProvider}
              placeholder="Amazon, Starbucks..."
              style={styles.field}
            />
            <CurrencyValueRow
              currency="USD"
              valueLabel="VALUE ($)"
              value={voucherValue}
              onChangeValue={setVoucherValue}
            />
          </FinancialSection>

          <FinancialSection title="Loans" icon="bank-outline">
            <AppTextField
              label="Loan Name"
              value={loanName}
              onChangeText={setLoanName}
              placeholder="Mortgage"
              style={styles.field}
            />
            <CurrencyValueRow
              currency="USD"
              valueLabel="PRINCIPAL ($)"
              value={loanPrincipal}
              onChangeValue={setLoanPrincipal}
            />
            <AppTextField
              label="ROI (%)"
              value={loanRoi}
              onChangeText={setLoanRoi}
              placeholder="0.00"
              keyboardType="decimal-pad"
              style={styles.field}
            />
            <AppTextField
              label="Duration (Mo)"
              value={loanDuration}
              onChangeText={setLoanDuration}
              placeholder="0"
              keyboardType="numeric"
              style={styles.field}
            />
            <AppTextField
              label="EMIs Paid"
              value={loanEmisPaid}
              onChangeText={setLoanEmisPaid}
              placeholder="0"
              keyboardType="numeric"
            />
          </FinancialSection>

          <FinancialSection title="Credit Cards" icon="credit-card-outline">
            <AppTextField
              label="Card Name"
              value={cardName}
              onChangeText={setCardName}
              placeholder="Platinum Rewards"
              style={styles.field}
            />
            <CurrencyValueRow
              currency="USD"
              valueLabel="LIMIT ($)"
              value={cardLimit}
              onChangeValue={setCardLimit}
            />
          </FinancialSection>

          <PrimaryButton label="Save & Finish" icon="check" onPress={handleSave} style={styles.save} />
          <PrimaryButton
            label="Back to Setup"
            variant="secondary"
            onPress={() => router.back()}
            style={styles.back}
          />
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  heading: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm + 2,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.primaryMuted,
  },
  addButtonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: spacing.lg,
  },
  field: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm + 2,
  },
  currencyField: {
    width: 92,
  },
  smallLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
    marginBottom: spacing.xs + 2,
  },
  currencyPill: {
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceInput,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyPillText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 13,
  },
  valueField: {
    flex: 1,
  },
  save: {
    marginTop: spacing.sm,
  },
  back: {
    marginTop: spacing.sm + 2,
  },
});
