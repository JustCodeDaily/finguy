import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { AtmosphericBackground } from '@/components/AtmosphericBackground';
import { colors, radius, spacing, textStyles } from '@/theme';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <View style={styles.root}>
      <AtmosphericBackground />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <View style={styles.logoBadge}>
                <MaterialCommunityIcons name="shield-lock" size={32} color={colors.onPrimaryContainer} />
              </View>
              <Text style={styles.brandTitle}>Aura Wallet</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.welcomeTitle}>Welcome Back</Text>
                <Text style={styles.welcomeSubtitle}>
                  Access your high-security digital vault.
                </Text>
              </View>

              <View style={styles.form}>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Email Address</Text>
                  <View style={[styles.inputWrap, emailFocused && styles.inputWrapFocused]}>
                    <MaterialIcons
                      name="mail"
                      size={20}
                      color={colors.onSurfaceVariant}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      placeholder="name@aura.com"
                      placeholderTextColor="rgba(185, 202, 202, 0.4)"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={styles.input}
                    />
                  </View>
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Security Key</Text>
                  <View style={[styles.inputWrap, passwordFocused && styles.inputWrapFocused]}>
                    <MaterialIcons
                      name="lock"
                      size={20}
                      color={colors.onSurfaceVariant}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      placeholder="••••••••••••"
                      placeholderTextColor="rgba(185, 202, 202, 0.4)"
                      secureTextEntry={!passwordVisible}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={[styles.input, styles.inputWithTrailingIcon]}
                    />
                    <Pressable
                      onPress={() => setPasswordVisible((v) => !v)}
                      hitSlop={10}
                      style={styles.eyeButton}
                    >
                      <MaterialIcons
                        name={passwordVisible ? 'visibility-off' : 'visibility'}
                        size={20}
                        color={colors.onSurfaceVariant}
                      />
                    </Pressable>
                  </View>
                  <View style={styles.forgotRow}>
                    <Pressable hitSlop={8}>
                      <Text style={styles.forgotLink}>Forgot Password?</Text>
                    </Pressable>
                  </View>
                </View>

                <Pressable
                  style={({ pressed }) => [styles.ctaButton, pressed && styles.ctaButtonPressed]}
                >
                  <Text style={styles.ctaButtonText}>Sign In</Text>
                  <MaterialIcons name="arrow-forward" size={20} color={colors.onPrimaryFixed} />
                </Pressable>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don&apos;t have an account?{' '}
                <Text style={styles.footerLink}>Sign Up</Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: radius.xl,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
    shadowColor: '#00f5ff',
    shadowOpacity: 0.3,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  brandTitle: {
    ...textStyles.headlineLgMobile,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    fontFamily: 'HankenGrotesk_700Bold',
  },
  card: {
    width: '100%',
    borderRadius: 24,
    padding: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 15 },
    elevation: 6,
  },
  cardHeader: {
    marginBottom: spacing.lg,
  },
  welcomeTitle: {
    ...textStyles.headlineLgMobile,
    color: colors.onSurface,
    marginBottom: spacing.base,
  },
  welcomeSubtitle: {
    ...textStyles.bodyMd,
    color: colors.onSurfaceVariant,
  },
  form: {
    gap: spacing.md,
  },
  field: {
    gap: spacing.xs,
  },
  fieldLabel: {
    ...textStyles.labelSm,
    color: colors.outline,
    textTransform: 'uppercase',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 42, 61, 0.4)',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  inputWrapFocused: {
    borderBottomColor: colors.primaryFixedDim,
  },
  inputIcon: {
    marginLeft: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
    color: colors.onSurface,
    ...textStyles.monoData,
  },
  inputWithTrailingIcon: {
    paddingRight: 44,
  },
  eyeButton: {
    position: 'absolute',
    right: spacing.sm,
  },
  forgotRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: spacing.xs,
  },
  forgotLink: {
    ...textStyles.labelSm,
    color: colors.primaryFixed,
    textDecorationLine: 'underline',
  },
  ctaButton: {
    height: 56,
    borderRadius: radius.xl,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.base,
    marginTop: spacing.xs,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  ctaButtonPressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: colors.primaryContainer,
  },
  ctaButtonText: {
    color: colors.onPrimaryFixed,
    fontFamily: 'HankenGrotesk_700Bold',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    ...textStyles.bodyMd,
    color: colors.onSurfaceVariant,
  },
  footerLink: {
    color: colors.primaryFixed,
    fontFamily: 'HankenGrotesk_700Bold',
  },
});
