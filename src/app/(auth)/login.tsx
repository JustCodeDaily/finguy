import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { signInWithPassword, signUpWithPassword } from '@/services/auth';
import { isValidEmail } from '@/utils/validate';
import { colors } from '@/theme/colors';

export default function Login() {
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = isValidEmail(email) && password.length >= 6 && !submitting;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      if (mode === 'signIn') {
        await signInWithPassword(email.trim(), password);
      } else {
        await signUpWithPassword(email.trim(), password);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text variant="headlineMedium" style={styles.title}>
        Expense + Debt Tracker
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        {mode === 'signIn' ? 'Sign in to continue' : 'Create an account'}
      </Text>

      <TextInput
        mode="outlined"
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {error && (
        <Text style={styles.error} variant="bodySmall">
          {error}
        </Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit}
        disabled={!canSubmit}
        loading={submitting}
        style={styles.button}
      >
        {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
      </Button>

      <Button
        mode="text"
        onPress={() => {
          setError(null);
          setMode(mode === 'signIn' ? 'signUp' : 'signIn');
        }}
      >
        {mode === 'signIn' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
  error: {
    color: colors.danger,
    textAlign: 'center',
    marginBottom: 12,
  },
});
