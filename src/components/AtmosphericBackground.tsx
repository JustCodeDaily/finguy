import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

export function AtmosphericBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={[styles.orb, styles.orbTopLeft]}>
        <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill} />
      </View>
      <View style={[styles.orb, styles.orbBottomRight]}>
        <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  orbTopLeft: {
    top: -100,
    left: -100,
    backgroundColor: 'rgba(0, 220, 229, 0.16)',
  },
  orbBottomRight: {
    bottom: -120,
    right: -120,
    width: 380,
    height: 380,
    backgroundColor: 'rgba(0, 108, 113, 0.22)',
  },
});
