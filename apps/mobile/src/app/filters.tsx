import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppHeader, Chip, PrimaryButton, Screen, SectionTitle } from "@/features/cafinder/components/CafinderUi";
import { atmosphereOptions } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;
const featureFilters = [
  { icon: "wifi", label: "Hizli Wi-Fi" },
  { icon: "deck", label: "Acik Alan" },
  { icon: "pets", label: "Hayvan Dostu" },
  { icon: "restaurant-menu", label: "Tatli" },
  { icon: "schedule", label: "Acik Olanlar" },
] as const;

export default function FiltersScreen() {
  const router = useRouter();
  const [atmosphere, setAtmosphere] = useState<string>(atmosphereOptions[0]!.title);
  const [features, setFeatures] = useState<string[]>(["Hizli Wi-Fi"]);
  const [priceRange, setPriceRange] = useState("₺₺");

  function toggleFeature(label: string) {
    setFeatures((current) => (
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label]
    ));
  }

  return (
    <Screen>
      <AppHeader actionIcon="close" onAction={() => router.back()} subtitle="Sonuclari incelt" title="Filtreler" />
      <SectionTitle title="Atmosfer" />
      <View style={styles.grid}>
        {atmosphereOptions.map((option) => {
          const active = atmosphere === option.title;

          return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            key={option.title}
            onPress={() => setAtmosphere(option.title)}
            style={[styles.option, active ? styles.optionActive : null]}
          >
            <MaterialIcons
              color={active ? colors.surface : colors.primary}
              name={option.icon}
              size={22}
            />
            <Text style={[styles.optionTitle, active ? styles.optionTitleActive : null]}>
              {option.title}
            </Text>
          </Pressable>
        );
        })}
      </View>
      <SectionTitle title="Ozellikler" />
      <View style={styles.chips}>
        {featureFilters.map((feature) => (
          <Chip
            active={features.includes(feature.label)}
            icon={feature.icon}
            key={feature.label}
            label={feature.label}
            onPress={() => toggleFeature(feature.label)}
          />
        ))}
      </View>
      <SectionTitle title="Fiyat araligi" />
      <View style={styles.priceRow}>
        {["₺", "₺₺", "₺₺₺"].map((price) => (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: priceRange === price }}
            key={price}
            onPress={() => setPriceRange(price)}
            style={[styles.price, priceRange === price ? styles.priceActive : null]}
          >
          <Text style={[styles.priceText, priceRange === price ? styles.priceTextActive : null]}>
            {price}
          </Text>
          </Pressable>
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
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    padding: spacing.md,
  },
  priceActive: {
    backgroundColor: colors.primary,
  },
  priceRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  priceText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
  },
  priceTextActive: {
    color: colors.surface,
  },
});
