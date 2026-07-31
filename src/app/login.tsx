import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text as RNText, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

const DUMMY_USERNAME = 'demo';
const DUMMY_PASSWORD = 'password123';

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === DUMMY_USERNAME && password === DUMMY_PASSWORD) {
      setError('');
      router.replace('/welcome');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.brand}>
        <RNText style={styles.shieldIcon}>🛡️</RNText>
        <Text variant="headlineLarge" style={{ color: theme.colors.primary }}>
          myWallet
        </Text>
      </View>

      <Text variant="headlineMedium" style={[styles.headline, { color: theme.colors.onBackground }]}>
        Hallo!
      </Text>

      <View style={styles.form}>
        <TextInput
          mode="outlined"
          label="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />

        {error ? (
          <Text style={[styles.error, { color: theme.colors.error }]}>{error}</Text>
        ) : null}

        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Log In
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  brand: {
    alignItems: 'center',
    marginBottom: 32,
  },
  shieldIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  headline: {
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  input: {
    marginBottom: 4,
  },
  error: {
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
});
