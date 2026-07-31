import { MD3DarkTheme } from 'react-native-paper';

export const colors = {
  background: '#0A0E1A',
  backgroundElevated: '#12172A',
  surface: 'rgba(255,255,255,0.06)',
  surfaceBorder: 'rgba(255,255,255,0.10)',
  surfaceInput: 'rgba(255,255,255,0.04)',
  primary: '#3D8BFF',
  primaryMuted: 'rgba(61,139,255,0.16)',
  accentPurple: '#7C6CFF',
  text: '#FFFFFF',
  textMuted: 'rgba(255,255,255,0.62)',
  textFaint: 'rgba(255,255,255,0.38)',
  danger: '#FF6B6B',
  success: '#3DDC97',
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export const radii = { sm: 8, md: 14, lg: 20, xl: 28, pill: 999 } as const;

export const paperTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary,
    onPrimary: '#FFFFFF',
    background: colors.background,
    surface: colors.backgroundElevated,
    surfaceVariant: colors.surface,
    onSurface: colors.text,
    onSurfaceVariant: colors.textMuted,
    outline: colors.surfaceBorder,
  },
};
