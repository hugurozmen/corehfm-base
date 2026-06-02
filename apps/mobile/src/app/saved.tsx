import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppHeader, CafeCard, ListCard, Screen, SectionTitle } from "@/features/cafinder/components/CafinderUi";
import { cafes, curatedLists } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme } from "@/features/cafinder/theme";

const { colors, spacing } = cafinderTheme;

export default function SavedScreen() {
  const router = useRouter();

  return (
    <Screen>
      <AppHeader subtitle="Kaydettigin tum mekanlar" title="Kaydedilenler" />
      <View style={styles.summary}>
        <Text style={styles.summaryValue}>18</Text>
        <Text style={styles.summaryLabel}>kayitli mekan</Text>
        <Text style={styles.summaryValue}>4</Text>
        <Text style={styles.summaryLabel}>aktif liste</Text>
      </View>
      <SectionTitle action="Duzenle" onActionPress={() => router.push("/lists/new")} title="Favoriler" />
      <CafeCard cafe={cafes[0]!} compact />
      <CafeCard cafe={cafes[2]!} compact />
      <SectionTitle action="Duzenle" onActionPress={() => router.push("/lists/new")} title="Gidilecekler" />
      <CafeCard cafe={cafes[1]!} compact />
      <CafeCard cafe={cafes[3]!} compact />
      <SectionTitle title="Ozel listeler" />
      {curatedLists.slice(0, 2).map((item) => (
        <ListCard item={item} key={item.id} onPress={() => router.push("/lists/new")} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: {
    alignItems: "baseline",
    backgroundColor: colors.primary,
    borderRadius: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    padding: spacing.lg,
  },
  summaryLabel: {
    color: colors.surfaceWarm,
    fontSize: 13,
    fontWeight: "900",
    marginRight: spacing.md,
    textTransform: "uppercase",
  },
  summaryValue: {
    color: colors.surface,
    fontSize: 30,
    fontWeight: "900",
  },
});
