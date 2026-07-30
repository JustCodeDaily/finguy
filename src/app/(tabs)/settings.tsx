import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { signOut } from '@/services/auth';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/theme/colors';

export default function Settings() {
  const user = useAuthStore((s) => s.user);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.text}>
        Settings
      </Text>
      {user?.email && (
        <Text variant="bodyMedium" style={styles.subtext}>
          Signed in as {user.email}
        </Text>
      )}
      <Button mode="contained" onPress={() => signOut()} style={styles.button}>
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  text: { color: colors.text },
  subtext: { color: colors.textMuted, marginTop: 8, marginBottom: 32 },
  button: { minWidth: 160 },
});
