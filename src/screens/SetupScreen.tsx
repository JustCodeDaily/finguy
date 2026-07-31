import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenBackground } from '@/components/ScreenBackground';
import { TopAppBar } from '@/components/TopAppBar';
import { AppTextField } from '@/components/AppTextField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { CURRENCIES, useOnboardingStore } from '@/store/onboarding';
import { colors, radii, spacing } from '@/theme';

export default function SetupScreen() {
  const { firstName, lastName, preferredName, currency, setField, setCurrency } =
    useOnboardingStore();

  const canContinue = firstName.trim().length > 0 && lastName.trim().length > 0;

  const handleContinue = () => {
    if (!canContinue) return;
    router.push('/financial-setup');
  };

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.flex} edges={['top', 'bottom']}>
        <TopAppBar />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.heading}>Account Setup</Text>
          <Text style={styles.subtitle}>
            Secure your financial profile and customize your institutional experience.
          </Text>

          <View style={styles.formCard}>
            <AppTextField
              label="FIRST NAME"
              value={firstName}
              onChangeText={(text) => setField('firstName', text)}
              placeholder="Institutional First Name"
              autoCapitalize="words"
              style={styles.field}
            />
            <AppTextField
              label="LAST NAME"
              value={lastName}
              onChangeText={(text) => setField('lastName', text)}
              placeholder="Institutional Last Name"
              autoCapitalize="words"
              style={styles.field}
            />
            <AppTextField
              label="HOW WOULD YOU LIKE TO BE ADDRESSED?"
              value={preferredName}
              onChangeText={(text) => setField('preferredName', text)}
              placeholder="Preferred Name (e.g. Alex)"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.currencySection}>
            <View style={styles.currencyHeaderRow}>
              <Text style={styles.sectionHeading}>Base Currency</Text>
              <View style={styles.currencyBadge}>
                <Text style={styles.currencyBadgeText}>{currency} selected</Text>
              </View>
            </View>

            <View style={styles.currencyGrid}>
              {CURRENCIES.map((item) => {
                const selected = item.code === currency;
                return (
                  <Pressable
                    key={item.code}
                    style={[styles.currencyCell, selected && styles.currencyCellSelected]}
                    onPress={() => setCurrency(item.code)}
                  >
                    <View style={styles.flagCircle}>
                      <Text style={styles.flagEmoji}>{item.flag}</Text>
                    </View>
                    <Text style={[styles.currencyLabel, selected && styles.currencyLabelSelected]}>
                      {item.code}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.actions}>
            <PrimaryButton
              label="Continue"
              icon="arrow-right"
              onPress={handleContinue}
              disabled={!canContinue}
            />
            <PrimaryButton
              label="Skip for now"
              variant="secondary"
              onPress={() => router.push('/financial-setup')}
              style={styles.skipButton}
            />
          </View>
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
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: spacing.lg,
  },
  field: {
    marginBottom: spacing.md,
  },
  currencySection: {
    marginTop: spacing.xl,
  },
  currencyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionHeading: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  currencyBadge: {
    backgroundColor: colors.primaryMuted,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
  },
  currencyBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  currencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm + 2,
  },
  currencyCell: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
  },
  currencyCellSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryMuted,
  },
  flagCircle: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: colors.backgroundElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs + 2,
  },
  flagEmoji: {
    fontSize: 22,
  },
  currencyLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  currencyLabelSelected: {
    color: colors.text,
  },
  actions: {
    marginTop: spacing.xl,
    gap: spacing.sm + 2,
  },
  skipButton: {
    marginTop: 0,
  },
});
