import { Image, StyleSheet, Text, View } from "react-native";
import { AppHeader, PrimaryButton, Screen, SettingRow } from "@/features/cafinder/components/CafinderUi";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

export default function ProfileDetailScreen() {
  return (
    <Screen>
      <AppHeader actionIcon="more-vert" subtitle="Kadikoy, Istanbul" title="Profil Detayi" />
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Ayse Yilmaz</Text>
        <Text style={styles.location}>Kadikoy, Istanbul</Text>
        <PrimaryButton icon="edit" label="Profili Duzenle" variant="secondary" />
      </View>
      <View style={styles.stats}>
        <Stat label="Gidilen Yerler" value="42" />
        <Stat label="Listeler" value="8" />
        <Stat label="Rozetler" value="15" />
      </View>
      <SettingRow icon="person" label="Hesap" />
      <SettingRow icon="notifications" label="Bildirimler" />
      <SettingRow icon="lock" label="Gizlilik" />
      <SettingRow icon="logout" label="Cikis Yap" />
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderColor: colors.surface,
    borderRadius: 999,
    borderWidth: 4,
    height: 110,
    width: 110,
  },
  card: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
    ...shadow,
  },
  location: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "800",
  },
  name: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 0,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },
  stats: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    padding: spacing.md,
  },
  statValue: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "900",
  },
});
