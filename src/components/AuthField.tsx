import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/theme';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  secureTextEntry?: boolean;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  onRightIconPress?: () => void;
  keyboardType?: 'default' | 'email-address';
  style?: ViewStyle;
};

export function AuthField({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry,
  rightIcon,
  onRightIconPress,
  keyboardType = 'default',
  style,
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.row, focused && styles.rowFocused]}>
        <MaterialIcons name={icon} size={20} color={colors.onSurfaceVariant} style={styles.leftIcon} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(218,226,253,0.4)"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[styles.input, rightIcon ? styles.inputWithRightIcon : undefined]}
        />
        {rightIcon ? (
          <Pressable style={styles.rightIcon} onPress={onRightIconPress} hitSlop={8}>
            <MaterialIcons name={rightIcon} size={20} color={colors.onSurfaceVariant} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.outline,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceInput,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  rowFocused: {
    borderBottomColor: colors.primaryFixed,
    boxShadow: '0px 4px 12px rgba(0,220,229,0.15)',
  },
  leftIcon: {
    marginLeft: 16,
  },
  rightIcon: {
    marginRight: 16,
  },
  input: {
    flex: 1,
    color: colors.onSurface,
    fontSize: 14,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
});
