import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '@/theme/colors';

interface SummaryCardProps {
  label: string;
  value: string;
  subValue?: string;
  accentColor?: string;
}

export function SummaryCard({
  label,
  value,
  subValue,
  accentColor = colors.primary,
}: SummaryCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: accentColor }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {subValue && <Text style={styles.subValue}>{subValue}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 16,
    marginBottom: 12,
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 6,
  },
  value: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  subValue: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
});
