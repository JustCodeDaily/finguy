export const colors = {
  background: '#121212',
  surface: '#1e1e1e',
  surfaceAlt: '#262626',
  border: '#333333',
  text: '#ffffff',
  textMuted: '#a0a0a0',
  primary: '#208AEF',
  success: '#3ECF8E',
  warning: '#F2B705',
  danger: '#F25C54',
};

export const categoryColors: Record<string, string> = {
  Food: '#F2B705',
  Coffee: '#B5651D',
  Cab: '#4C9AFF',
  Gym: '#3ECF8E',
  Subscriptions: '#9B59B6',
  Rent: '#F25C54',
  Shopping: '#E67E22',
  Bills: '#5DADE2',
  Travel: '#1ABC9C',
  Other: '#7F8C8D',
};

export function getCategoryColor(category: string): string {
  return categoryColors[category] ?? categoryColors.Other;
}

import { MD3DarkTheme } from 'react-native-paper';

export const paperDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    surface: colors.surface,
    surfaceVariant: colors.surfaceAlt,
    onSurface: colors.text,
    onBackground: colors.text,
    error: colors.danger,
  },
};
