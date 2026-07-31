import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenBackground } from '@/components/ScreenBackground';
import { GlassCard } from '@/components/GlassCard';
import { AppTextField } from '@/components/AppTextField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useAuthStore, DEMO_CREDENTIALS } from '@/store/auth';
import { colors, spacing } from '@/theme';

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    const success = login(email, password);
    if (success) {
      setError(null);
      router.replace('/setup');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoWrap}>
            <View style={styles.logoCircle}>
              <MaterialCommunityIcons name="hexagon-outline" size={44} color={colors.primary} />
            </View>
          </View>

          <GlassCard style={styles.card}>
            <Text style={styles.heading}>Hallo!</Text>

            <AppTextField
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="name@aura.com"
              icon="email-outline"
              keyboardType="email-address"
              style={styles.field}
            />

            <AppTextField
              label="Security Key"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••••••"
              icon="lock-outline"
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={() => setShowPassword((prev) => !prev)}
              style={styles.field}
            />

            <View style={styles.forgotRow}>
              <Text style={styles.link}>Forgot password?</Text>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Text style={styles.hint}>
              Demo login · {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
            </Text>

            <PrimaryButton
              label="Log In"
              icon="arrow-right"
              onPress={handleLogin}
              style={styles.submit}
            />
          </GlassCard>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don&apos;t have an account? </Text>
            <Text style={styles.link}>Sign Up</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: spacing.lg + 1,
  },
  heading: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  field: {
    marginBottom: spacing.md,
  },
  forgotRow: {
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    marginBottom: spacing.sm,
  },
  hint: {
    color: colors.textFaint,
    fontSize: 12,
    marginBottom: spacing.md,
  },
  submit: {
    marginTop: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
