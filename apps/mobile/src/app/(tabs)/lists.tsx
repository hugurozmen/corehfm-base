import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  AppHeader,
  CafeCard,
  IconButton,
  ListCard,
  Screen,
  SectionTitle,
} from "@/features/cafinder/components/CafinderUi";
import { cafes, curatedLists } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

export default function ListsScreen() {
  const router = useRouter();

  return (
    <Screen>
      <AppHeader
        onAction={() => router.push("/screens")}
        subtitle="Kaydettigin ve olusturdugun rotalar"
        title="Listelerim"
      />

      <Pressable onPress={() => router.push("/lists/new")} style={styles.createCard}>
        <View style={styles.createIcon}>
          <MaterialIcons color={colors.surface} name="add" size={28} />
        </View>
        <View style={styles.createCopy}>
          <Text style={styles.createTitle}>Yeni Liste</Text>
          <Text style={styles.createText}>Kendi kesif rotani yarat ve arkadaslarinla paylas.</Text>
        </View>
        <IconButton icon="chevron-right" />
      </Pressable>

      <SectionTitle action="Yeni liste" title="Ozel listeler" />
      {curatedLists.map((item) => (
        <ListCard item={item} key={item.id} />
      ))}

      <SectionTitle action="Duzenle" title="Favoriler" />
      <CafeCard cafe={cafes[0]} compact />
      <CafeCard cafe={cafes[2]} compact />

      <SectionTitle action="Tumunu gor" title="Gidilecekler" />
      <View style={styles.savedGrid}>
        {cafes.slice(1, 5).map((cafe) => (
          <Pressable key={cafe.id} onPress={() => router.push("/saved")} style={styles.savedTile}>
            <Image source={{ uri: cafe.imageUrl }} style={styles.savedImage} />
            <View style={styles.savedOverlay} />
            <Text numberOfLines={1} style={styles.savedTitle}>
              {cafe.name}
            </Text>
            <View style={styles.savedMeta}>
              <MaterialIcons color={colors.surface} name="star" size={13} />
              <Text style={styles.savedMetaText}>{cafe.rating}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.privacyCard}>
        <MaterialIcons color={colors.primary} name="lock" size={22} />
        <View style={styles.privacyCopy}>
          <Text style={styles.privacyTitle}>Gizli listeler</Text>
          <Text style={styles.privacyText}>Listelerini sadece sen gorebilir veya herkese acik yapabilirsin.</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  createCard: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
    ...shadow,
  },
  createCopy: {
    flex: 1,
    gap: 4,
  },
  createIcon: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: radius.lg,
    height: 58,
    justifyContent: "center",
    width: 58,
  },
  createText: {
    color: colors.surfaceWarm,
    fontSize: 14,
    lineHeight: 20,
  },
  createTitle: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: "900",
  },
  privacyCard: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  privacyCopy: {
    flex: 1,
    gap: 3,
  },
  privacyText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  privacyTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
  },
  savedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  savedImage: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
  },
  savedMeta: {
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
    position: "absolute",
    right: 10,
    top: 10,
  },
  savedMetaText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: "900",
  },
  savedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(42, 26, 20, 0.34)",
  },
  savedTile: {
    borderRadius: radius.lg,
    height: 142,
    justifyContent: "flex-end",
    overflow: "hidden",
    padding: spacing.md,
    width: "48%",
  },
  savedTitle: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: "900",
  },
});
