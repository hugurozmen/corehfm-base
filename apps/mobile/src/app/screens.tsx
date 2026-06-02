import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { AppHeader, Screen } from "@/features/cafinder/components/CafinderUi";
import { cafinderTheme } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

const pages = [
  { href: "/(auth)/login", icon: "login", label: "0. Login flow" },
  { href: "/flow/splash", icon: "local-cafe", label: "1. Splash" },
  { href: "/flow/onboarding", icon: "coffee", label: "2. Onboarding" },
  { href: "/flow/phone", icon: "phone-iphone", label: "4. Telefon dogrulama" },
  { href: "/flow/verify", icon: "dialpad", label: "5. Kod dogrulama" },
  { href: "/flow/location", icon: "location-on", label: "6. Konum izni" },
  { href: "/flow/city", icon: "location-city", label: "7. Sehir ve ilce" },
  { href: "/flow/atmosphere", icon: "wb-twilight", label: "9. Atmosfer" },
  { href: "/(tabs)/discover", icon: "explore", label: "Kesfet" },
  { href: "/filters", icon: "tune", label: "Filtreler" },
  { href: "/discover-swipe", icon: "swipe", label: "11. Kesfet kaydir" },
  { href: "/(tabs)/map", icon: "map", label: "16. Harita" },
  { href: "/(tabs)/lists", icon: "format-list-bulleted", label: "Listeler" },
  { href: "/saved", icon: "favorite", label: "17. Kaydedilenler" },
  { href: "/lists/new", icon: "playlist-add", label: "18. Liste olustur" },
  { href: "/(tabs)/plan", icon: "calendar-today", label: "Planla" },
  { href: "/plan/new", icon: "group-add", label: "19. Grup plani" },
  { href: "/(tabs)/profile", icon: "person", label: "Profil" },
  { href: "/profile/detail", icon: "person", label: "20. Profil detayi" },
  { href: "/place/petra", icon: "storefront", label: "Mekan detayi" },
] as const;

export default function ScreensIndex() {
  return (
    <Screen>
      <AppHeader subtitle="Tum Stitch ekranlari" title="Mockup Ekranlari" />
      <Text style={styles.copy}>
        Her ekran dogrudan acilabilir. Ana app icindeki butonlar da bu rotalara baglidir.
      </Text>
      <View style={styles.grid}>
        {pages.map((page) => (
          <Link asChild href={page.href} key={page.href}>
            <Pressable style={styles.pageCard}>
              <View style={styles.icon}>
                <MaterialIcons color={colors.primary} name={page.icon} size={22} />
              </View>
              <Text style={styles.pageLabel}>{page.label}</Text>
              <MaterialIcons color={colors.muted} name="chevron-right" size={20} />
            </Pressable>
          </Link>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  copy: {
    color: colors.mutedStrong,
    fontSize: 15,
    lineHeight: 23,
  },
  grid: {
    gap: spacing.sm,
  },
  icon: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.md,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  pageCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  pageLabel: {
    color: colors.ink,
    flex: 1,
    fontSize: 15,
    fontWeight: "900",
  },
});
