import { Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useTheme } from 'react-native-paper';

const NAV_ITEMS = [
  { key: 'wallet', label: 'Home', icon: '💳' },
  { key: 'market', label: 'Market', icon: '📈' },
  { key: 'security', label: 'Security', icon: '🛡️' },
  { key: 'profile', label: 'Profile', icon: '👤' },
] as const;

const ACTIVE_KEY = 'wallet';

// Not part of react-native-paper's MD3Colors type, so kept as a local constant.
const SURFACE_CONTAINER_LOW = '#131b2e';

export default function WelcomeScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'bottom']}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: SURFACE_CONTAINER_LOW, borderBottomColor: theme.colors.outlineVariant },
        ]}
      >
        <View style={styles.headerLeft}>
          <RNText style={styles.headerIcon}>🛡️</RNText>
          <Text variant="headlineSmall" style={{ color: theme.colors.onBackground }}>
            FINTECH
          </Text>
        </View>
        <Pressable hitSlop={8}>
          <RNText style={[styles.bellIcon, { color: theme.colors.onSurfaceVariant }]}>🔔</RNText>
        </Pressable>
      </View>

      {/* Empty content canvas */}
      <View style={styles.main} />

      <View
        style={[
          styles.nav,
          { backgroundColor: SURFACE_CONTAINER_LOW, borderTopColor: theme.colors.outlineVariant },
        ]}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === ACTIVE_KEY;
          return (
            <Pressable key={item.key} style={styles.navItem}>
              <RNText style={styles.navIcon}>{item.icon}</RNText>
              <Text
                variant="labelSmall"
                style={{ color: isActive ? theme.colors.primary : theme.colors.onSurfaceVariant }}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerIcon: { fontSize: 20 },
  bellIcon: { fontSize: 20 },
  main: { flex: 1 },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  navItem: { alignItems: 'center', gap: 2 },
  navIcon: { fontSize: 20 },
});
