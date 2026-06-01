import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  AppHeader,
  PrimaryButton,
  Screen,
  SectionTitle,
  SettingRow,
} from "@/features/cafinder/components/CafinderUi";
import { profileBadges } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";
import { useAuthStore } from "@/features/auth/store";

const { colors, radius, spacing } = cafinderTheme;

export default function ProfileScreen() {
  const email = useAuthStore((state) => state.email);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Screen>
      <AppHeader subtitle={email ?? "deniz@cafinder.app"} title="Profil" />

      <View style={styles.profileCard}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Deniz Yilmaz</Text>
        <View style={styles.locationRow}>
          <MaterialIcons color={colors.muted} name="location-on" size={16} />
          <Text style={styles.locationText}>Istanbul, TR</Text>
        </View>
        <View style={styles.statsRow}>
          <ProfileStat label="Gidilen Mekan" value="42" />
          <ProfileStat label="Favori Liste" value="8" />
          <ProfileStat label="Rozet" value="15" />
        </View>
        <PrimaryButton icon="edit" label="Profili Duzenle" variant="secondary" />
      </View>

      <SectionTitle title="Rozetlerim" />
      <View style={styles.badgeRow}>
        {profileBadges.map((badge, index) => (
          <View key={badge.title} style={[styles.badgeCard, index === 2 ? styles.badgeLocked : null]}>
            <View style={styles.badgeIcon}>
              <MaterialIcons color={colors.primary} name={badge.icon} size={24} />
            </View>
            <Text style={styles.badgeText}>{badge.title}</Text>
            {index === 2 ? <Text style={styles.lockText}>Yeni</Text> : null}
          </View>
        ))}
      </View>

      <SectionTitle title="Hesap ayarlari" />
      <View style={styles.settings}>
        <SettingRow icon="person" label="Hesap" />
        <SettingRow icon="notifications" label="Bildirimler" />
        <SettingRow icon="restaurant-menu" label="Diyet tercihleri" />
        <SettingRow icon="lock" label="Gizlilik" />
        <SettingRow icon="help" label="Yardim ve destek" />
      </View>

      <PrimaryButton icon="logout" label="Cikis Yap" onPress={logout} variant="ghost" />
    </Screen>
  );
}

interface ProfileStatProps {
  label: string;
  value: string;
}

function ProfileStat({ label, value }: ProfileStatProps) {
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
    height: 104,
    width: 104,
  },
  badgeCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flex: 1,
    gap: spacing.sm,
    minHeight: 116,
    padding: spacing.md,
  },
  badgeIcon: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  badgeLocked: {
    opacity: 0.82,
  },
  badgeRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  badgeText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },
  locationRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  locationText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "800",
  },
  lockText: {
    color: colors.secondary,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  name: {
    color: colors.ink,
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: 0,
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
    ...shadow,
  },
  settings: {
    gap: spacing.sm,
  },
  stat: {
    alignItems: "center",
    flex: 1,
    gap: 2,
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },
  statsRow: {
    alignSelf: "stretch",
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    marginVertical: spacing.sm,
    padding: spacing.md,
  },
  statValue: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "900",
  },
});
