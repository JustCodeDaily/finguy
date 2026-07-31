export const fonts = {
  hankenRegular: 'HankenGrotesk_400Regular',
  hankenMedium: 'HankenGrotesk_500Medium',
  hankenSemiBold: 'HankenGrotesk_600SemiBold',
  hankenBold: 'HankenGrotesk_700Bold',
  geistRegular: 'Geist_400Regular',
  geistMedium: 'Geist_500Medium',
} as const;

export const textStyles = {
  displayLg: {
    fontFamily: fonts.hankenBold,
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -0.96,
  },
  headlineLgMobile: {
    fontFamily: fonts.hankenSemiBold,
    fontSize: 24,
    lineHeight: 32,
  },
  headlineLg: {
    fontFamily: fonts.hankenSemiBold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.32,
  },
  bodyMd: {
    fontFamily: fonts.hankenRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  labelSm: {
    fontFamily: fonts.geistMedium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
  },
  monoData: {
    fontFamily: fonts.geistRegular,
    fontSize: 14,
    lineHeight: 20,
  },
} as const;
