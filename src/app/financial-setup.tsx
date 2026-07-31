import { Redirect } from 'expo-router';
import FinancialSetupScreen from '@/screens/FinancialSetupScreen';
import { useAuthStore } from '@/store/auth';

export default function FinancialSetup() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }
  return <FinancialSetupScreen />;
}
