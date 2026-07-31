import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { paperTheme, colors } from '@/theme';

export default function RootLayout() {
  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
      />
    </PaperProvider>
  );
}
