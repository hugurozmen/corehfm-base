import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  AppHeader,
  CafeCard,
  Chip,
  HeroCafeCard,
  PrimaryButton,
  Screen,
  SearchBar,
  SectionTitle,
} from "@/features/cafinder/components/CafinderUi";
import { cafes } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;
const filters = [
  { icon: undefined, label: "Tumu" },
  { icon: "new-releases", label: "Yeni" },
  { icon: "whatshot", label: "Populer" },
  { icon: "laptop-mac", label: "Calisma Alani" },
  { icon: "deck", label: "Bahceli" },
  { icon: "pets", label: "Pet Friendly" },
] as const;

export default function DiscoverScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("Tumu");
  const [previewIndex, setPreviewIndex] = useState(4);
  const [petra, espresso, kronotrop, norm] = cafes;
  const previewCafe = cafes[previewIndex % cafes.length] ?? cafes[0]!;

  return (
    <Screen>
      <AppHeader
        eyebrow="Gunaydin Deniz"
        onAction={() => router.push("/filters")}
        subtitle="Bugun hangi moddasın?"
        title="Cafinder"
      />
      <SearchBar onFilterPress={() => router.push("/filters")} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chipRow}>
          {filters.map((filter) => (
            <Chip
              active={activeFilter === filter.label}
              icon={filter.icon}
              key={filter.label}
              label={filter.label}
              onPress={() => setActiveFilter(filter.label)}
            />
          ))}
        </View>
      </ScrollView>

      <HeroCafeCard cafe={petra} />

      <View style={styles.quickStats}>
        <View style={styles.statCard}>
          <MaterialIcons color={colors.primary} name="near-me" size={22} />
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Yakindaki mekan</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons color={colors.warning} name="star" size={22} />
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>Ortalama puan</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons color={colors.success} name="schedule" size={22} />
          <Text style={styles.statValue}>18</Text>
          <Text style={styles.statLabel}>Su an acik</Text>
        </View>
      </View>

      <SectionTitle
        action="Haritada gor"
        onActionPress={() => router.push("/(tabs)/map")}
        title="Senin icin secildi"
      />
      <CafeCard cafe={espresso} />
      <CafeCard cafe={kronotrop} />

      <SectionTitle
        action="Tam ekran"
        onActionPress={() => router.push("/discover-swipe")}
        title="Kaydirarak kesfet"
      />
      <PrimaryButton
        icon="swipe"
        label="Kaydirma Modunu Ac"
        onPress={() => router.push("/discover-swipe")}
        variant="secondary"
      />
      <View style={styles.swipeCard}>
        <CafeCard cafe={previewCafe} />
        <View style={styles.swipeActions}>
          <Pressable onPress={() => setPreviewIndex((current) => current + 1)} style={styles.roundAction}>
            <MaterialIcons color={colors.danger} name="close" size={25} />
          </Pressable>
          <Pressable onPress={() => router.push("/saved")} style={[styles.roundAction, styles.roundActionPrimary]}>
            <MaterialIcons color={colors.surface} name="bookmark" size={24} />
          </Pressable>
          <Pressable onPress={() => setPreviewIndex((current) => current + 1)} style={styles.roundAction}>
            <MaterialIcons color={colors.primary} name="favorite" size={25} />
          </Pressable>
        </View>
      </View>

      <SectionTitle title="Sessiz calisma alanlari" />
      <CafeCard cafe={norm} compact />
    </Screen>
  );
}

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  quickStats: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  roundAction: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    height: 56,
    justifyContent: "center",
    width: 56,
    ...shadow,
  },
  roundActionPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    height: 64,
    width: 64,
  },
  statCard: {
    alignItems: "flex-start",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flex: 1,
    gap: 3,
    minHeight: 108,
    padding: spacing.md,
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 16,
  },
  statValue: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900",
  },
  swipeActions: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "center",
    marginTop: -20,
  },
  swipeCard: {
    gap: spacing.sm,
  },
});
