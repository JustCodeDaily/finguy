import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radii, spacing } from '@/theme';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  secureTextEntry?: boolean;
  rightIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onRightIconPress?: () => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'decimal-pad';
  autoCapitalize?: 'none' | 'words' | 'sentences' | 'characters';
  style?: ViewStyle;
};

export function AppTextField({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry,
  rightIcon,
  onRightIconPress,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
}: Props) {
  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        mode="flat"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textFaint}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        left={icon ? <TextInput.Icon icon={icon} color={colors.textMuted} /> : undefined}
        right={rightIcon ? <TextInput.Icon icon={rightIcon} color={colors.textMuted} onPress={onRightIconPress} forceTextInputFocus={false} /> : undefined}
        style={styles.input}
        contentStyle={styles.inputContent}
        textColor={colors.text}
        underlineColor="transparent"
        activeUnderlineColor={colors.primary}
        theme={{ colors: { onSurfaceVariant: colors.textMuted } }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
    marginBottom: spacing.xs + 2,
  },
  input: {
    backgroundColor: colors.surfaceInput,
    borderRadius: radii.md,
    height: 52,
  },
  inputContent: {
    paddingTop: 0,
  },
});
