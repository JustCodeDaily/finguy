import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';

type Props = {
  onIconPress?: () => void;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

export function TopAppBar({ onIconPress, icon = 'bell-outline' }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.brand}>
        <View style={styles.logoMark}>
          <MaterialCommunityIcons name="hexagon-outline" size={20} color={colors.primary} />
        </View>
        <Text style={styles.wordmark}>Tallio</Text>
      </View>
      <Pressable style={styles.iconButton} onPress={onIconPress} hitSlop={8}>
        <MaterialCommunityIcons name={icon} size={20} color={colors.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 64,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoMark: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordmark: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
