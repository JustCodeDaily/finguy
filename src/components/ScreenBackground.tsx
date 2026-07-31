import { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

/**
 * Matches the "Atmospheric Background Element" / `.animated-mesh` blobs from
 * the design: two soft radial glows over the deep navy background, built
 * from `filter: blur(...)` (supported by RN's Fabric renderer) over flat
 * translucent fills, since RN has no radial-gradient primitive.
 */
export function ScreenBackground({ children }: PropsWithChildren) {
  return (
    <View style={styles.root}>
      <View style={styles.blobLayer}>
        <View style={[styles.blob, styles.blobTopLeft]}>
          <View style={[styles.blobFill, { backgroundColor: 'rgba(0,220,229,0.35)' }]} />
          <View
            style={[
              styles.blobFill,
              { backgroundColor: 'rgba(99,247,255,0.25)', top: '15%', left: '15%', right: '35%', bottom: '35%' },
            ]}
          />
        </View>
        <View style={[styles.blob, styles.blobBottomRight]}>
          <View style={[styles.blobFill, { backgroundColor: 'rgba(0,108,113,0.55)' }]} />
        </View>
      </View>
      {children}
    </View>
  );
}

const blurFilter = { filter: 'blur(80px)' } as ViewStyle;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0b1326',
  },
  blobLayer: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  blob: {
    position: 'absolute',
  },
  blobFill: {
    ...StyleSheet.absoluteFill,
    borderRadius: 9999,
    ...blurFilter,
  },
  blobTopLeft: {
    top: '-10%',
    left: '-10%',
    width: '40%',
    height: '40%',
    opacity: 0.6,
  },
  blobBottomRight: {
    bottom: '-10%',
    right: '-10%',
    width: '50%',
    height: '50%',
    opacity: 0.4,
  },
});
