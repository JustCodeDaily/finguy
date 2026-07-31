import { Redirect } from 'expo-router';
import SetupScreen from '@/screens/SetupScreen';
import { useAuthStore } from '@/store/auth';

export default function Setup() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }
  return <SetupScreen />;
}
