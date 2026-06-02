import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  AppHeader,
  PrimaryButton,
  Screen,
  SectionTitle,
} from "@/features/cafinder/components/CafinderUi";
import { cafes, friends } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

export default function PlanScreen() {
  const router = useRouter();
  const cafe = cafes[0];
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
      <AppHeader subtitle="Arkadaslarinla bulusma organize et" title="Plan Yap" />

      <View style={styles.startCard}>
        <View style={styles.startTop}>
          <View>
            <Text style={styles.startKicker}>Yeni plan baslat</Text>
            <Text style={styles.startTitle}>Petra Roasting Co.</Text>
            <Text style={styles.startText}>12 Ekim Cumartesi, 14:00 icin taslak plan.</Text>
          </View>
          <Image source={{ uri: cafe.imageUrl }} style={styles.startImage} />
        </View>

        <View style={styles.steps}>
          <PlanStep done icon="storefront" label="Mekan" />
          <PlanStep done icon="schedule" label="Zaman" />
          <PlanStep icon="group-add" label="Davet" />
        </View>

        <PrimaryButton
          icon="group-add"
          label="Arkadaslarini Davet Et"
          onPress={() => router.push("/plan/new")}
        />
      </View>

      <SectionTitle title="Arkadaslarini davet et" />
      <View style={styles.friendList}>
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
                <Text style={styles.avatarInitials}>{friend.initials}</Text>
              </View>
            )}
            <View style={styles.friendCopy}>
              <Text style={styles.friendName}>{friend.name}</Text>
              <Text style={styles.friendNote}>{friend.note}</Text>
            </View>
            <View style={[styles.checkCircle, selected ? styles.checkCircleSelected : null]}>
              {selected ? <MaterialIcons color={colors.surface} name="check" size={18} /> : null}
            </View>
          </Pressable>
        );
        })}
      </View>

      <SectionTitle action="Tum planlar" onActionPress={() => router.push("/plan/new")} title="Yaklasan planlar" />
      <Pressable onPress={() => router.push("/plan/new")} style={styles.upcomingCard}>
        <View style={styles.calendarBox}>
          <Text style={styles.calendarMonth}>Eki</Text>
          <Text style={styles.calendarDay}>12</Text>
        </View>
        <View style={styles.upcomingCopy}>
          <Text style={styles.upcomingTitle}>Kahve bulusmasi</Text>
          <Text style={styles.upcomingText}>Petra Roasting Co. • 3 kisi • 14:00</Text>
        </View>
        <MaterialIcons color={colors.primary} name="chevron-right" size={24} />
      </Pressable>

      <View style={styles.emptyCard}>
        <MaterialIcons color={colors.secondary} name="event-available" size={36} />
        <Text style={styles.emptyTitle}>Planlarini sicak tut</Text>
        <Text style={styles.emptyText}>
          Favori kafelerinden birini sec, zamani belirle ve daveti tek dokunusla tamamla.
        </Text>
      </View>
    </Screen>
  );
}

interface PlanStepProps {
  done?: boolean;
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
}

function PlanStep({ done, icon, label }: PlanStepProps) {
  return (
    <View style={styles.step}>
      <View style={[styles.stepIcon, done ? styles.stepIconDone : null]}>
        <MaterialIcons color={done ? colors.surface : colors.primary} name={icon} size={20} />
      </View>
      <Text style={styles.stepLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 999,
    height: 50,
    width: 50,
  },
  avatarFallback: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  avatarInitials: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "900",
  },
  calendarBox: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 62,
    justifyContent: "center",
    width: 58,
  },
  calendarDay: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: "900",
  },
  calendarMonth: {
    color: colors.surfaceWarm,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  checkCircle: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 2,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  checkCircleSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  emptyTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
  },
  friendCopy: {
    flex: 1,
    gap: 3,
  },
  friendList: {
    gap: spacing.sm,
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
  startCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.lg,
    padding: spacing.lg,
    ...shadow,
  },
  startImage: {
    borderRadius: radius.lg,
    height: 90,
    width: 90,
  },
  startKicker: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  startText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
  startTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0,
    marginTop: 3,
  },
  startTop: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  step: {
    alignItems: "center",
    flex: 1,
    gap: spacing.xs,
  },
  stepIcon: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  stepIconDone: {
    backgroundColor: colors.primary,
  },
  stepLabel: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
  },
  steps: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  upcomingCard: {
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
  upcomingCopy: {
    flex: 1,
    gap: 3,
  },
  upcomingText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
  },
  upcomingTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
  },
});
