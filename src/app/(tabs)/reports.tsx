import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '@/theme/colors';

export default function Reports() {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.text}>
        Reports
      </Text>
      <Text variant="bodyMedium" style={styles.subtext}>
        Coming soon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: colors.text },
  subtext: { color: colors.textMuted, marginTop: 8 },
});
