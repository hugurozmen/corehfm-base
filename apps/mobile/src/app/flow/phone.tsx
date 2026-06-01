import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PrimaryButton, Screen } from "@/features/cafinder/components/CafinderUi";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

export default function PhoneScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.panel}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons color={colors.primary} name="arrow-back" size={22} />
        </Pressable>
        <MaterialIcons color={colors.primary} name="phone-iphone" size={36} />
        <Text style={styles.title}>Telefon numarani dogrula</Text>
        <Text style={styles.copy}>
          Hesabini guvene almak icin telefon numarana 6 haneli bir dogrulama kodu gonderecegiz.
        </Text>
        <View style={styles.inputRow}>
          <View style={styles.countryCode}>
            <Text style={styles.countryText}>TR +90</Text>
            <MaterialIcons color={colors.primary} name="expand-more" size={18} />
          </View>
          <TextInput
            keyboardType="phone-pad"
            placeholder="5-- --- -- --"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
        </View>
        <View style={styles.keypad}>
          {["1", "2 ABC", "3 DEF", "4 GHI", "5 JKL", "6 MNO", "7 PQRS", "8 TUV", "9 WXYZ", "0"].map((key) => (
            <Pressable key={key} style={styles.key}>
              <Text style={styles.keyText}>{key}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <PrimaryButton icon="arrow-forward" label="Devam Et" onPress={() => router.push("/flow/verify")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  copy: {
    color: colors.mutedStrong,
    fontSize: 15,
    lineHeight: 23,
  },
  countryCode: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.md,
    flexDirection: "row",
    gap: 3,
    paddingHorizontal: spacing.md,
  },
  countryText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900",
  },
  input: {
    color: colors.ink,
    flex: 1,
    fontSize: 18,
    fontWeight: "900",
  },
  inputRow: {
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 58,
    padding: spacing.xs,
  },
  key: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.md,
    minHeight: 52,
    justifyContent: "center",
    width: "30%",
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    justifyContent: "center",
  },
  keyText: {
    color: colors.primary,
    fontSize: 14,
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
  title: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 32,
  },
});
