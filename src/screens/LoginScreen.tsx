import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenBackground } from '@/components/ScreenBackground';
import { GlassCard } from '@/components/GlassCard';
import { AuthField } from '@/components/AuthField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useAuthStore, DEMO_CREDENTIALS } from '@/store/auth';
import { colors } from '@/theme';

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
              <MaterialCommunityIcons name="hexagon-outline" size={44} color={colors.primaryFixed} />
            </View>
          </View>

          <GlassCard style={styles.card}>
            <Text style={styles.heading}>Hallo!</Text>

            <AuthField
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="name@aura.com"
              icon="mail-outline"
              keyboardType="email-address"
              style={styles.field}
            />

            <AuthField
              label="Security Key"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••••••"
              icon="lock-outline"
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? 'visibility-off' : 'visibility'}
              onRightIconPress={() => setShowPassword((prev) => !prev)}
              style={styles.field}
            />

            <View style={styles.forgotRow}>
              <Text style={styles.link}>Forgot Password?</Text>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Text style={styles.hint}>
              Demo login · {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
            </Text>

            <PrimaryButton
              label="Sign In"
              materialIcon="arrow-forward"
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
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 24,
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
    padding: 24,
    backgroundColor: colors.surfaceGlass,
    borderColor: colors.surfaceGlassBorder,
    borderRadius: 24,
    boxShadow: '0px 25px 50px rgba(0,0,0,0.5)',
  },
  heading: {
    color: colors.onSurface,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  field: {
    marginBottom: 16,
  },
  forgotRow: {
    alignItems: 'flex-end',
    marginTop: 8,
    marginBottom: 16,
  },
  link: {
    color: colors.primaryFixed,
    fontSize: 12,
    fontWeight: '600',
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    marginBottom: 8,
  },
  hint: {
    color: colors.textFaint,
    fontSize: 12,
    marginBottom: 16,
  },
  submit: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: colors.onSurfaceVariant,
    fontSize: 16,
  },
});
