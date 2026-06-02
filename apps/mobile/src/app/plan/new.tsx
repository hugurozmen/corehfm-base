import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppHeader, PrimaryButton, Screen, SectionTitle } from "@/features/cafinder/components/CafinderUi";
import { cafes, friends } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

export default function NewPlanScreen() {
  const router = useRouter();
  const cafe = cafes[0]!;
  const [selectedFriendIds, setSelectedFriendIds] = useState(
    friends.filter((friend) => friend.selected).map((friend) => friend.id),
  );

  function toggleFriend(id: string) {
    setSelectedFriendIds((current) => (
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    ));
  }

  return (
    <Screen>
      <AppHeader actionIcon="arrow-back" onAction={() => router.back()} subtitle="1 Mekan 2 Zaman 3 Davet" title="Yeni Plan" />
      <View style={styles.summaryCard}>
        <Image source={{ uri: cafe.imageUrl }} style={styles.summaryImage} />
        <View style={styles.summaryCopy}>
          <Text style={styles.summaryTitle}>{cafe.name}</Text>
          <Text style={styles.summaryText}>12 Ekim Cumartesi, 14:00</Text>
        </View>
      </View>
      <SectionTitle title="Arkadaslarini davet et" />
      <View style={styles.searchRow}>
        <MaterialIcons color={colors.muted} name="search" size={20} />
        <TextInput placeholder="Arkadas ara..." placeholderTextColor={colors.muted} style={styles.searchInput} />
      </View>
      {friends.map((friend) => {
        const selected = selectedFriendIds.includes(friend.id);

        return (
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected }}
          key={friend.id}
          onPress={() => toggleFriend(friend.id)}
          style={styles.friendRow}
        >
          {friend.imageUrl ? (
            <Image source={{ uri: friend.imageUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.initials}>{friend.initials}</Text>
            </View>
          )}
          <View style={styles.friendCopy}>
            <Text style={styles.friendName}>{friend.name}</Text>
            <Text style={styles.friendNote}>{friend.note}</Text>
          </View>
          <View style={[styles.checkbox, selected ? styles.checkboxSelected : null]}>
            {selected ? <MaterialIcons color={colors.surface} name="check" size={18} /> : null}
          </View>
        </Pressable>
      );
      })}
      <PrimaryButton icon="check-circle" label="Plani Tamamla" onPress={() => router.push("/(tabs)/plan")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 999,
    height: 52,
    width: 52,
  },
  avatarFallback: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  checkbox: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 2,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  friendCopy: {
    flex: 1,
    gap: 3,
  },
  friendName: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
  },
  friendNote: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
  },
  friendRow: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  initials: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "900",
  },
  searchInput: {
    color: colors.ink,
    flex: 1,
    fontSize: 15,
    fontWeight: "800",
  },
  searchRow: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 54,
    paddingHorizontal: spacing.md,
  },
  summaryCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    ...shadow,
  },
  summaryCopy: {
    flex: 1,
    gap: 4,
  },
  summaryImage: {
    borderRadius: radius.lg,
    height: 92,
    width: 92,
  },
  summaryText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "800",
  },
  summaryTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900",
  },
});
