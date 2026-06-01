import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AppHeader, IconButton, Screen } from "@/features/cafinder/components/CafinderUi";
import { cafes } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

export default function DiscoverSwipeScreen() {
  const cafe = cafes[4] ?? cafes[0]!;

  return (
    <Screen>
      <AppHeader subtitle="Kartlari kaydirarak sec" title="Kesfet" />
      <View style={styles.card}>
        <Image source={{ uri: cafe.imageUrl }} style={styles.image} />
        <View style={styles.overlay} />
        <IconButton icon="favorite" />
        <View style={styles.copy}>
          <Text style={styles.kicker}>1.5 km uzakta • Galata</Text>
          <Text style={styles.title}>{cafe.name}</Text>
          <View style={styles.meta}>
            <MaterialIcons color={colors.warning} name="star" size={18} />
            <Text style={styles.metaText}>{cafe.rating}</Text>
            <Text style={styles.metaText}>{cafe.tags.join(" • ")}</Text>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <View style={styles.actionButton}>
          <MaterialIcons color={colors.danger} name="close" size={30} />
          <Text style={styles.actionText}>Gec</Text>
        </View>
        <View style={[styles.actionButton, styles.saveButton]}>
          <MaterialIcons color={colors.surface} name="bookmark" size={30} />
          <Text style={styles.saveText}>Kaydet</Text>
        </View>
        <View style={styles.actionButton}>
          <MaterialIcons color={colors.primary} name="favorite" size={30} />
          <Text style={styles.actionText}>Begen</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: 5,
    minHeight: 84,
    justifyContent: "center",
    width: "30%",
    ...shadow,
  },
  actionText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "center",
  },
  card: {
    borderRadius: radius.xl,
    height: 540,
    justifyContent: "space-between",
    overflow: "hidden",
    padding: spacing.md,
    ...shadow,
  },
  copy: {
    gap: spacing.xs,
  },
  image: {
    ...StyleSheet.absoluteFill,
    height: "100%",
    width: "100%",
  },
  kicker: {
    color: colors.surfaceWarm,
    fontSize: 13,
    fontWeight: "900",
  },
  meta: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  metaText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: "900",
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(42, 26, 20, 0.38)",
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    minHeight: 98,
  },
  saveText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: "900",
  },
  title: {
    color: colors.surface,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 38,
  },
});
