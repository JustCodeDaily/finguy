import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/theme';

/**
 * Reproduces the "Atmospheric Background Element" from the Figma design:
 * two soft glow blobs over a deep navy background. No blur library is
 * available in this project, so softness is faked with stacked,
 * decreasing-opacity rings instead of a real gaussian blur.
 */
export function ScreenBackground({ children }: PropsWithChildren) {
  return (
    <View style={styles.root}>
      <View style={styles.blobLayer}>
        <Glow style={styles.blobTopLeft} color={colors.primary} />
        <Glow style={styles.blobBottomRight} color={colors.accentPurple} />
      </View>
      {children}
    </View>
  );
}

function Glow({ style, color }: { style: object; color: string }) {
  return (
    <View style={[styles.glowBase, style]}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: color, opacity: 0.16, borderRadius: 999 }]} />
      <View style={[styles.glowInner, { backgroundColor: color, opacity: 0.14 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  blobLayer: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  glowBase: {
    position: 'absolute',
  },
  glowInner: {
    position: 'absolute',
    top: '20%',
    left: '20%',
    right: '20%',
    bottom: '20%',
    borderRadius: 999,
  },
  blobTopLeft: {
    top: -80,
    left: -60,
    width: 220,
    height: 380,
  },
  blobBottomRight: {
    top: 480,
    right: -80,
    width: 260,
    height: 460,
  },
});
