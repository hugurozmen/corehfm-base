import { ScrollView, StyleSheet, Text, View } from "react-native";
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

export default function DiscoverScreen() {
  const router = useRouter();
  const [petra, espresso, kronotrop, norm, vienna] = cafes;

  return (
    <Screen>
      <AppHeader
        eyebrow="Gunaydin Deniz"
        onAction={() => router.push("/filters")}
        subtitle="Bugun hangi moddasın?"
        title="Cafinder"
      />
      <SearchBar />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chipRow}>
          <Chip active label="Tumu" />
          <Chip icon="new-releases" label="Yeni" />
          <Chip icon="whatshot" label="Populer" />
          <Chip icon="laptop-mac" label="Calisma Alani" />
          <Chip icon="deck" label="Bahceli" />
          <Chip icon="pets" label="Pet Friendly" />
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

      <SectionTitle action="Haritada gor" title="Senin icin secildi" />
      <CafeCard cafe={espresso} />
      <CafeCard cafe={kronotrop} />

      <SectionTitle action="Tam ekran" title="Kaydirarak kesfet" />
      <PrimaryButton
        icon="swipe"
        label="Kaydirma Modunu Ac"
        onPress={() => router.push("/discover-swipe")}
        variant="secondary"
      />
      <View style={styles.swipeCard}>
        <CafeCard cafe={vienna} />
        <View style={styles.swipeActions}>
          <View style={styles.roundAction}>
            <MaterialIcons color={colors.danger} name="close" size={25} />
          </View>
          <View style={[styles.roundAction, styles.roundActionPrimary]}>
            <MaterialIcons color={colors.surface} name="bookmark" size={24} />
          </View>
          <View style={styles.roundAction}>
            <MaterialIcons color={colors.primary} name="favorite" size={25} />
          </View>
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
