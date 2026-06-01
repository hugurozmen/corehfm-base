import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "@core/ui";
import { appEnv } from "@/shared/lib/env";
import { useNetworkStatus } from "@/shared/hooks/useNetworkStatus";

export default function HomeScreen() {
  const { isConnected } = useNetworkStatus();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Mobile base is ready</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Environment</Text>
        <Text style={styles.value}>{appEnv.APP_ENV}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>API</Text>
        <Text style={styles.value}>{appEnv.API_BASE_URL}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Network</Text>
        <Text style={styles.value}>{isConnected ? "Online" : "Offline"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  label: {
    color: colors.muted,
    fontSize: typography.caption,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  title: {
    color: colors.ink,
    fontSize: typography.heading,
    fontWeight: "800",
    marginBottom: spacing.sm,
  },
  value: {
    color: colors.ink,
    fontSize: typography.body,
  },
});
