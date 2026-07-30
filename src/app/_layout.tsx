import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth } from '@/hooks/useAuth';
import { paperDarkTheme } from '@/theme/colors';

export default function RootLayout() {
  useAuth();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={paperDarkTheme}>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
