import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppHeader, Chip, PrimaryButton, Screen, SectionTitle } from "@/features/cafinder/components/CafinderUi";
import { atmosphereOptions } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

export default function FiltersScreen() {
  const router = useRouter();

  return (
    <Screen>
      <AppHeader actionIcon="close" onAction={() => router.back()} subtitle="Sonuclari incelt" title="Filtreler" />
      <SectionTitle title="Atmosfer" />
      <View style={styles.grid}>
        {atmosphereOptions.map((option, index) => (
          <View key={option.title} style={[styles.option, index === 0 ? styles.optionActive : null]}>
            <MaterialIcons
              color={index === 0 ? colors.surface : colors.primary}
              name={option.icon}
              size={22}
            />
            <Text style={[styles.optionTitle, index === 0 ? styles.optionTitleActive : null]}>
              {option.title}
            </Text>
          </View>
        ))}
      </View>
      <SectionTitle title="Ozellikler" />
      <View style={styles.chips}>
        <Chip active icon="wifi" label="Hizli Wi-Fi" />
        <Chip icon="deck" label="Acik Alan" />
        <Chip icon="pets" label="Hayvan Dostu" />
        <Chip icon="restaurant-menu" label="Tatli" />
        <Chip icon="schedule" label="Acik Olanlar" />
      </View>
      <SectionTitle title="Fiyat araligi" />
      <View style={styles.priceRow}>
        {["₺", "₺₺", "₺₺₺"].map((price, index) => (
          <Text key={price} style={[styles.price, index === 1 ? styles.priceActive : null]}>
            {price}
          </Text>
        ))}
      </View>
      <PrimaryButton icon="search" label="Sonuclari Goster" onPress={() => router.push("/(tabs)/discover")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  option: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.xs,
    minHeight: 102,
    justifyContent: "center",
    padding: spacing.md,
    width: "48%",
  },
  optionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },
  optionTitleActive: {
    color: colors.surface,
  },
  price: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    color: colors.primary,
    flex: 1,
    fontSize: 20,
    fontWeight: "900",
    padding: spacing.md,
    textAlign: "center",
  },
  priceActive: {
    backgroundColor: colors.primary,
    color: colors.surface,
  },
  priceRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});
