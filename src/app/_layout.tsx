import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

import { auraWalletTheme } from '../theme/theme';

export default function RootLayout() {
  return (
    <PaperProvider theme={auraWalletTheme}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
