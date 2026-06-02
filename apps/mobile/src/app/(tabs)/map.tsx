import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppHeader, CafeCard, Chip, Screen, SearchBar } from "@/features/cafinder/components/CafinderUi";
import { cafes } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;
const mapFilters = [
  { icon: "schedule", label: "Acik Olanlar" },
  { icon: "local-cafe", label: "Kahveciler" },
  { icon: "laptop-mac", label: "Calisma" },
] as const;

export default function MapScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("Acik Olanlar");

  return (
    <Screen>
      <AppHeader onAction={() => router.push("/filters")} subtitle="Yakindaki kahve rotalari" title="Harita" />
      <View style={styles.mapCard}>
        <View style={styles.mapTexture}>
          <View style={[styles.road, styles.roadOne]} />
          <View style={[styles.road, styles.roadTwo]} />
          <View style={[styles.road, styles.roadThree]} />
          <Pin label="Petra Roasting Co." left="50%" top="30%" />
          <Pin label="Kronotrop" left="25%" top="54%" />
          <Pin label="Norm Coffee" left="66%" top="62%" />
          <Pin label="MOC" left="72%" top="38%" muted />
        </View>
        <View style={styles.mapSearch}>
          <SearchBar onFilterPress={() => router.push("/filters")} placeholder="Semt veya mekan ara..." />
          <View style={styles.filterRow}>
            {mapFilters.map((filter) => (
              <Chip
                active={activeFilter === filter.label}
                icon={filter.icon}
                key={filter.label}
                label={filter.label}
                onPress={() => setActiveFilter(filter.label)}
              />
            ))}
          </View>
        </View>
        <Pressable onPress={() => setActiveFilter("Acik Olanlar")} style={styles.locationButton}>
          <MaterialIcons color={colors.surface} name="my-location" size={24} />
        </Pressable>
      </View>

      <View style={styles.resultHeader}>
        <View>
          <Text style={styles.resultTitle}>Yakindaki secimler</Text>
          <Text style={styles.resultSubtitle}>Konumuna gore siralandi</Text>
        </View>
        <Text style={styles.resultCount}>5 mekan</Text>
      </View>

      {cafes.slice(0, 3).map((cafe) => (
        <CafeCard key={cafe.id} cafe={cafe} compact />
      ))}

      <Pressable onPress={() => router.push("/plan/new")} style={styles.routeCard}>
        <View style={styles.routeIcon}>
          <MaterialIcons color={colors.primary} name="route" size={25} />
        </View>
        <View style={styles.routeCopy}>
          <Text style={styles.routeTitle}>Karakoy kahve rotasi</Text>
          <Text style={styles.routeText}>3 mekan • 42 dk yuruyus • Tatli molasi dahil</Text>
        </View>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=220&q=80",
          }}
          style={styles.routeImage}
        />
      </Pressable>
    </Screen>
  );
}

interface PinProps {
  label: string;
  left: `${number}%`;
  muted?: boolean;
  top: `${number}%`;
}

function Pin({ label, left, muted, top }: PinProps) {
  return (
    <View style={[styles.pin, { left, top }]}>
      <View style={[styles.pinBubble, muted ? styles.pinBubbleMuted : null]}>
        <MaterialIcons color={colors.surface} name="local-cafe" size={18} />
      </View>
      <Text style={styles.pinLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  locationButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 999,
    bottom: spacing.md,
    height: 54,
    justifyContent: "center",
    position: "absolute",
    right: spacing.md,
    width: 54,
    ...shadow,
  },
  mapCard: {
    borderRadius: radius.xl,
    height: 430,
    overflow: "hidden",
    ...shadow,
  },
  mapSearch: {
    gap: spacing.sm,
    left: spacing.md,
    position: "absolute",
    right: spacing.md,
    top: spacing.md,
  },
  mapTexture: {
    backgroundColor: "#E9D7C8",
    flex: 1,
  },
  pin: {
    alignItems: "center",
    gap: 4,
    position: "absolute",
  },
  pinBubble: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderColor: colors.surface,
    borderRadius: 999,
    borderWidth: 3,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  pinBubbleMuted: {
    backgroundColor: colors.secondary,
  },
  pinLabel: {
    backgroundColor: colors.surface,
    borderRadius: 999,
    color: colors.primary,
    fontSize: 11,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  resultCount: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900",
  },
  resultHeader: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultSubtitle: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
  },
  resultTitle: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: "900",
  },
  road: {
    backgroundColor: "rgba(255,255,255,0.58)",
    borderRadius: 999,
    height: 26,
    position: "absolute",
    width: "125%",
  },
  roadOne: {
    left: "-10%",
    top: "36%",
    transform: [{ rotate: "-21deg" }],
  },
  roadThree: {
    left: "-20%",
    top: "74%",
    transform: [{ rotate: "12deg" }],
  },
  roadTwo: {
    left: "-15%",
    top: "55%",
    transform: [{ rotate: "36deg" }],
  },
  routeCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    ...shadow,
  },
  routeCopy: {
    flex: 1,
    gap: 3,
  },
  routeIcon: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.md,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  routeImage: {
    borderRadius: radius.md,
    height: 58,
    width: 58,
  },
  routeText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
  },
  routeTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
  },
});
