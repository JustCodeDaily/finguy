import { MD3DarkTheme } from 'react-native-paper';

// Exact tokens from the Figma-generated design system (Aura / Tallio dark theme).
export const colors = {
  background: '#0b1326',
  surface: '#0b1326',
  surfaceDim: '#0b1326',
  surfaceBright: '#31394d',
  surfaceContainerLowest: '#060e20',
  surfaceContainerLow: '#131b2e',
  surfaceContainer: '#171f33',
  surfaceContainerHigh: '#222a3d',
  surfaceContainerHighest: '#2d3449',
  surfaceVariant: '#2d3449',

  onSurface: '#dae2fd',
  onBackground: '#dae2fd',
  onSurfaceVariant: '#b9caca',
  inverseSurface: '#dae2fd',
  inverseOnSurface: '#283044',

  outline: '#849495',
  outlineVariant: '#3a494a',

  primary: '#e9feff',
  primaryFixed: '#63f7ff',
  primaryFixedDim: '#00dce5',
  primaryContainer: '#00f5ff',
  onPrimary: '#003739',
  onPrimaryFixed: '#002021',
  onPrimaryContainer: '#006c71',
  inversePrimary: '#00696e',
  surfaceTint: '#00dce5',

  secondary: '#bcc7de',
  secondaryFixed: '#d8e3fb',
  secondaryFixedDim: '#bcc7de',
  secondaryContainer: '#3e495d',
  onSecondary: '#263143',
  onSecondaryContainer: '#aeb9d0',

  tertiary: '#f9faff',
  tertiaryFixed: '#d4e4fa',
  tertiaryFixedDim: '#b9c8de',
  tertiaryContainer: '#d0dff5',
  onTertiary: '#233143',
  onTertiaryContainer: '#546275',

  error: '#ffb4ab',
  onError: '#690005',
  errorContainer: '#93000a',
  onErrorContainer: '#ffdad6',

  // Semantic aliases used across screens/components.
  backgroundElevated: '#171f33',
  surfaceGlass: 'rgba(255,255,255,0.03)',
  surfaceGlassBorder: 'rgba(255,255,255,0.08)',
  surfaceInput: 'rgba(34,42,61,0.4)',
  surfaceBorder: 'rgba(255,255,255,0.08)',
  primaryMuted: 'rgba(99,247,255,0.14)',
  accentPurple: '#63f7ff',
  text: '#dae2fd',
  textMuted: '#b9caca',
  textFaint: 'rgba(218,226,253,0.4)',
  danger: '#ffb4ab',
  success: '#3ddc97',
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export const radii = { sm: 8, md: 14, lg: 20, xl: 28, pill: 999 } as const;

export const typography = {
  displayLg: { fontSize: 48, lineHeight: 56, fontWeight: '700' as const, letterSpacing: -0.5 },
  headlineLg: { fontSize: 32, lineHeight: 40, fontWeight: '600' as const, letterSpacing: -0.3 },
  headlineLgMobile: { fontSize: 24, lineHeight: 32, fontWeight: '600' as const },
  bodyMd: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  labelSm: { fontSize: 12, lineHeight: 16, fontWeight: '500' as const, letterSpacing: 0.6 },
  monoData: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
} as const;

export const paperTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primaryFixed,
    onPrimary: colors.onPrimaryFixed,
    background: colors.background,
    surface: colors.backgroundElevated,
    surfaceVariant: colors.surfaceContainerHigh,
    onSurface: colors.text,
    onSurfaceVariant: colors.textMuted,
    outline: colors.outline,
  },
};
