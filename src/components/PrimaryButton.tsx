import { ActivityIndicator, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { colors, radii } from '@/theme';

type Props = {
  label: string;
  onPress: () => void;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  materialIcon?: keyof typeof MaterialIcons.glyphMap;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

export function PrimaryButton({
  label,
  onPress,
  icon,
  materialIcon,
  variant = 'primary',
  loading,
  disabled,
  style,
}: Props) {
  const isSecondary = variant === 'secondary';
  const contentColor = isSecondary ? colors.primaryFixed : colors.onPrimaryFixed;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        isSecondary ? styles.secondary : styles.primary,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && !loading && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={contentColor} />
      ) : (
        <View style={styles.content}>
          <Text style={[styles.label, { color: contentColor }]}>{label}</Text>
          {materialIcon ? (
            <MaterialIcons name={materialIcon} size={18} color={contentColor} style={styles.icon} />
          ) : icon ? (
            <MaterialCommunityIcons name={icon} size={18} color={contentColor} style={styles.icon} />
          ) : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primaryFixed,
    boxShadow: `0px 8px 16px rgba(0,220,229,0.25)`,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  icon: {
    marginLeft: 8,
  },
});
