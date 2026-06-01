import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PrimaryButton, Screen } from "@/features/cafinder/components/CafinderUi";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

export default function LocationPermissionScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.panel}>
        <View style={styles.cluster}>
          <View style={[styles.bubble, styles.mainBubble]}>
            <MaterialIcons color={colors.surface} name="location-on" size={36} />
          </View>
          <View style={styles.bubble}>
            <MaterialIcons color={colors.primary} name="local-cafe" size={25} />
          </View>
          <View style={styles.smallBubble}>
            <MaterialIcons color={colors.primary} name="storefront" size={21} />
          </View>
        </View>
        <Text style={styles.title}>Sana yakin mekanlari gosterelim</Text>
        <Text style={styles.copy}>
          En iyi kahvecileri ve gizli kalmis mekanlari kesfetmek icin konum izni ver.
        </Text>
      </View>
      <PrimaryButton icon="my-location" label="Konuma Izin Ver" onPress={() => router.push("/flow/city")} />
      <PrimaryButton label="Daha Sonra" onPress={() => router.push("/flow/city")} variant="ghost" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  bubble: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    height: 62,
    justifyContent: "center",
    width: 62,
  },
  cluster: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
  },
  copy: {
    color: colors.mutedStrong,
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
  },
  mainBubble: {
    backgroundColor: colors.primary,
    height: 92,
    width: 92,
  },
  panel: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.lg,
    padding: spacing.xl,
    ...shadow,
  },
  smallBubble: {
    alignItems: "center",
    backgroundColor: colors.backgroundAlt,
    borderRadius: 999,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  title: {
    color: colors.ink,
    fontSize: 29,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 33,
    textAlign: "center",
  },
});
