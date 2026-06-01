import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton, SectionTitle } from "@/features/cafinder/components/CafinderUi";
import { cafes } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

export default function PlaceDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const cafe = cafes.find((item) => item.id === id) ?? cafes[0];

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={{ uri: cafe.imageUrl }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroTop}>
            <Pressable onPress={() => router.back()} style={styles.topButton}>
              <MaterialIcons color={colors.primary} name="arrow-back" size={22} />
            </Pressable>
            <Pressable style={styles.topButton}>
              <MaterialIcons color={colors.primary} name="share" size={21} />
            </Pressable>
          </View>
          <View style={styles.heroCopy}>
            <Text style={styles.category}>{cafe.category}</Text>
            <Text style={styles.title}>{cafe.name}</Text>
            <View style={styles.metaRow}>
              <MaterialIcons color={colors.warning} name="star" size={18} />
              <Text style={styles.metaText}>{cafe.rating}</Text>
              <Text style={styles.metaText}>•</Text>
              <Text style={styles.metaText}>{cafe.price}</Text>
              <Text style={styles.metaText}>•</Text>
              <Text style={styles.metaText}>{cafe.distance}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tagRow}>
          {cafe.tags.map((tag) => (
            <Text key={tag} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>

        <InfoBlock icon="location-on" title={cafe.area} text={cafe.address} />
        <InfoBlock icon="schedule" title={cafe.hours} text="Hafta ici ve hafta sonu servis saatleri degisebilir." />

        <SectionTitle title="Imkanlar" />
        <View style={styles.amenityGrid}>
          {cafe.amenities.map((amenity) => (
            <View key={amenity} style={styles.amenity}>
              <MaterialIcons color={colors.primary} name={amenityIcon(amenity)} size={20} />
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>

        <SectionTitle title="Hakkinda" />
        <Text style={styles.about}>{cafe.description}</Text>

        <View style={styles.actions}>
          <PrimaryButton icon="bookmark" label="Listeye Ekle" variant="secondary" />
          <PrimaryButton icon="event-available" label="Rezervasyon" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface InfoBlockProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  text: string;
  title: string;
}

function InfoBlock({ icon, text, title }: InfoBlockProps) {
  return (
    <View style={styles.infoBlock}>
      <View style={styles.infoIcon}>
        <MaterialIcons color={colors.primary} name={icon} size={22} />
      </View>
      <View style={styles.infoCopy}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoText}>{text}</Text>
      </View>
    </View>
  );
}

function amenityIcon(amenity: string): keyof typeof MaterialIcons.glyphMap {
  if (amenity.includes("Wi-Fi")) {
    return "wifi";
  }

  if (amenity.includes("Alan") || amenity.includes("Mekan")) {
    return "deck";
  }

  if (amenity.includes("Pet")) {
    return "pets";
  }

  if (amenity.includes("Klima")) {
    return "ac-unit";
  }

  return "check-circle";
}

const styles = StyleSheet.create({
  about: {
    color: colors.mutedStrong,
    fontSize: 15,
    lineHeight: 24,
  },
  actions: {
    gap: spacing.sm,
  },
  amenity: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    padding: spacing.md,
    width: "48%",
  },
  amenityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  amenityText: {
    color: colors.ink,
    flex: 1,
    fontSize: 13,
    fontWeight: "800",
  },
  category: {
    color: colors.surfaceWarm,
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  content: {
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  hero: {
    borderRadius: radius.xl,
    height: 430,
    justifyContent: "space-between",
    overflow: "hidden",
    padding: spacing.md,
    ...shadow,
  },
  heroCopy: {
    gap: spacing.xs,
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    height: "100%",
    width: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(42, 26, 20, 0.34)",
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoBlock: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  infoCopy: {
    flex: 1,
    gap: 3,
  },
  infoIcon: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.md,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  infoText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  infoTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  metaText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: "900",
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  tag: {
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  title: {
    color: colors.surface,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 38,
  },
  topButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 999,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
});
