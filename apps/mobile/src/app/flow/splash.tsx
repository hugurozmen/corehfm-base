import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PrimaryButton, Screen } from "@/features/cafinder/components/CafinderUi";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

export default function SplashScreen() {
  const router = useRouter();

  return (
    <Screen scroll={false}>
      <View style={styles.center}>
        <View style={styles.logo}>
          <MaterialIcons color={colors.primary} name="local-cafe" size={56} />
          <MaterialIcons color={colors.secondary} name="location-on" size={32} style={styles.pin} />
        </View>
        <Text style={styles.title}>Cafinder</Text>
        <Text style={styles.subtitle}>Curated coffee culture</Text>
      </View>
      <PrimaryButton
        icon="arrow-forward"
        label="Devam Et"
        onPress={() => router.push("/flow/onboarding")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    flex: 1,
    gap: spacing.sm,
    justifyContent: "center",
  },
  logo: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    height: 132,
    justifyContent: "center",
    width: 132,
    ...shadow,
  },
  pin: {
    position: "absolute",
    right: 23,
    top: 24,
  },
  subtitle: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    color: colors.ink,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 0,
  },
});
