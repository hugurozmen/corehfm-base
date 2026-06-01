import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PrimaryButton, Screen } from "@/features/cafinder/components/CafinderUi";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

export default function VerifyScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.panel}>
        <MaterialIcons color={colors.primary} name="dialpad" size={38} />
        <Text style={styles.title}>Dogrulama Kodu</Text>
        <Text style={styles.copy}>
          Lutfen +90 5** *** ** 42 numarana gonderilen 6 haneli kodu gir.
        </Text>
        <View style={styles.otpRow}>
          {["1", "8", "", "", "", ""].map((digit, index) => (
            <View key={`${digit}-${index}`} style={styles.otpBox}>
              <Text style={styles.otpText}>{digit}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.resend}>Kodu alamadiniz mi? Tekrar Gonder</Text>
      </View>
      <PrimaryButton icon="arrow-forward" label="Dogrula" onPress={() => router.push("/flow/location")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  copy: {
    color: colors.mutedStrong,
    fontSize: 15,
    lineHeight: 23,
  },
  otpBox: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 56,
    justifyContent: "center",
    width: 46,
  },
  otpRow: {
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
  },
  otpText: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "900",
  },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
    ...shadow,
  },
  resend: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },
  title: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0,
  },
});
