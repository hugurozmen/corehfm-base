import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Redirect } from "expo-router";
import { colors, radius, spacing, typography } from "@core/ui";
import { useAuthStore } from "@/features/auth/store";

export default function LoginScreen() {
  const [email, setEmail] = useState("developer@example.com");
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.panel}>
        <Text style={styles.eyebrow}>CoreHFM Base</Text>
        <Text style={styles.title}>Team starter mobile app</Text>
        <Text style={styles.description}>
          Mock auth flow, secure-token adapter, shared API client, env validation, and Expo Router
          are ready to extend.
        </Text>

        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          value={email}
        />

        <Pressable onPress={() => login(email)} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  buttonText: {
    color: colors.surface,
    fontSize: typography.body,
    fontWeight: "700",
  },
  description: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  input: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    fontSize: typography.body,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  panel: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    width: "100%",
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  title: {
    color: colors.ink,
    fontSize: typography.heading,
    fontWeight: "800",
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
});
