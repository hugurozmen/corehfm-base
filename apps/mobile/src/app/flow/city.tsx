import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppHeader, PrimaryButton, Screen, SearchBar, SectionTitle } from "@/features/cafinder/components/CafinderUi";
import { allCities, popularCities } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

export default function CitySelectionScreen() {
  const router = useRouter();

  return (
    <Screen>
      <AppHeader actionIcon="close" subtitle="Istanbul varsayilan secildi" title="Sehir Secimi" />
      <SearchBar placeholder="Sehir veya ilce ara..." />
      <SectionTitle title="Populer sehirler" />
      <View style={styles.cityList}>
        {popularCities.map((city) => (
          <View key={city.name} style={styles.cityCard}>
            <Image source={{ uri: city.imageUrl }} style={styles.cityImage} />
            <View style={styles.cityCopy}>
              <Text style={styles.cityName}>{city.name}</Text>
              <Text style={styles.cityDistricts}>{city.districts.join(", ")}</Text>
            </View>
            <MaterialIcons color={colors.primary} name="chevron-right" size={24} />
          </View>
        ))}
      </View>
      <SectionTitle title="Tum sehirler" />
      <View style={styles.allCities}>
        {allCities.map((city) => (
          <Text key={city} style={styles.cityChip}>
            {city}
          </Text>
        ))}
      </View>
      <PrimaryButton icon="arrow-forward" label="Devam Et" onPress={() => router.push("/flow/atmosphere")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  allCities: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  cityCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.sm,
    ...shadow,
  },
  cityChip: {
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  cityCopy: {
    flex: 1,
    gap: 3,
  },
  cityDistricts: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
  },
  cityImage: {
    borderRadius: radius.md,
    height: 70,
    width: 70,
  },
  cityList: {
    gap: spacing.sm,
  },
  cityName: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900",
  },
});
