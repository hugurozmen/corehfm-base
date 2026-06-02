import { useRef, useState } from "react";
import { Animated, Image, PanResponder, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppHeader, IconButton, Screen } from "@/features/cafinder/components/CafinderUi";
import { cafes } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

type SwipeAction = "liked" | "saved" | "skipped";

const { colors, radius, spacing } = cafinderTheme;

const actionCopy: Record<SwipeAction, { icon: keyof typeof MaterialIcons.glyphMap; intent: string; label: string; past: string }> = {
  liked: { icon: "favorite", intent: "Begen", label: "Begen", past: "begenildi" },
  saved: { icon: "bookmark", intent: "Kaydet", label: "Kaydet", past: "kaydedildi" },
  skipped: { icon: "close", intent: "Gec", label: "Gec", past: "gecildi" },
};

function intentFromGesture(dx: number, dy: number) {
  if (dy < -110) {
    return actionCopy.saved.intent;
  }

  if (dx > 86) {
    return actionCopy.liked.intent;
  }

  if (dx < -86) {
    return actionCopy.skipped.intent;
  }

  return "";
}

export default function DiscoverSwipeScreen() {
  const router = useRouter();
  const position = useRef(new Animated.ValueXY()).current;
  const isAnimating = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragIntent, setDragIntent] = useState("");
  const [message, setMessage] = useState("Kartlari kaydirarak sec.");
  const [stats, setStats] = useState({ liked: 0, saved: 0, skipped: 0 });
  const cafe = cafes[activeIndex % cafes.length] ?? cafes[0]!;
  const nextCafe = cafes[(activeIndex + 1) % cafes.length] ?? cafes[0]!;

  function resetCard() {
    Animated.spring(position, {
      friction: 7,
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start(() => {
      setDragIntent("");
    });
  }

  function completeAction(action: SwipeAction, toValue: { x: number; y: number }) {
    if (isAnimating.current) {
      return;
    }

    isAnimating.current = true;
    setDragIntent(actionCopy[action].intent);
    Animated.timing(position, {
      duration: 190,
      toValue,
      useNativeDriver: true,
    }).start(() => {
      setStats((current) => ({ ...current, [action]: current[action] + 1 }));
      setMessage(`${cafe.name} ${actionCopy[action].past}. Siradaki: ${nextCafe.name}.`);
      setActiveIndex((current) => current + 1);
      position.setValue({ x: 0, y: 0 });
      setDragIntent("");
      isAnimating.current = false;
    });
  }

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_event, gesture) => Math.abs(gesture.dx) > 8 || Math.abs(gesture.dy) > 8,
    onPanResponderMove: (_event, gesture) => {
      const y = Math.max(-90, Math.min(45, gesture.dy));

      position.setValue({ x: gesture.dx, y });
      setDragIntent(intentFromGesture(gesture.dx, gesture.dy));
    },
    onPanResponderRelease: (_event, gesture) => {
      if (gesture.dy < -120) {
        completeAction("saved", { x: 0, y: -520 });
        return;
      }

      if (gesture.dx > 96) {
        completeAction("liked", { x: 430, y: gesture.dy });
        return;
      }

      if (gesture.dx < -96) {
        completeAction("skipped", { x: -430, y: gesture.dy });
        return;
      }

      resetCard();
    },
    onStartShouldSetPanResponder: () => true,
  });

  const rotate = position.x.interpolate({
    inputRange: [-180, 0, 180],
    outputRange: ["-11deg", "0deg", "11deg"],
  });

  return (
    <Screen scroll={false}>
      <AppHeader
        actionIcon="arrow-back"
        onAction={() => router.back()}
        subtitle="Kartlari kaydirarak sec"
        title="Kesfet"
      />
      <View style={styles.stage}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.card,
            {
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                { rotate },
              ],
            },
          ]}
        >
          <Image source={{ uri: cafe.imageUrl }} style={styles.image} />
          <View style={styles.overlay} />
          <View style={styles.topRow}>
            <Text style={styles.counter}>{(activeIndex % cafes.length) + 1}/{cafes.length}</Text>
            <IconButton icon="favorite" onPress={() => completeAction("liked", { x: 430, y: 0 })} />
          </View>
          {dragIntent ? <Text style={styles.intent}>{dragIntent}</Text> : null}
          <View style={styles.copy}>
            <Text style={styles.kicker}>{cafe.distance} uzakta - {cafe.area}</Text>
            <Text style={styles.title}>{cafe.name}</Text>
            <View style={styles.meta}>
              <MaterialIcons color={colors.warning} name="star" size={18} />
              <Text style={styles.metaText}>{cafe.rating}</Text>
              <Text style={styles.metaText}>{cafe.tags.join(" - ")}</Text>
            </View>
          </View>
        </Animated.View>
      </View>
      <Text accessibilityLiveRegion="polite" style={styles.status}>{message}</Text>
      <View style={styles.actions}>
        <SwipeActionButton action="skipped" onPress={() => completeAction("skipped", { x: -430, y: 0 })} />
        <SwipeActionButton action="saved" emphasized onPress={() => completeAction("saved", { x: 0, y: -520 })} />
        <SwipeActionButton action="liked" onPress={() => completeAction("liked", { x: 430, y: 0 })} />
      </View>
      <View style={styles.stats}>
        <Stat label="Begenildi" value={stats.liked} />
        <Stat label="Kaydedildi" value={stats.saved} />
        <Stat label="Gecildi" value={stats.skipped} />
      </View>
    </Screen>
  );
}

interface SwipeActionButtonProps {
  action: SwipeAction;
  emphasized?: boolean;
  onPress: () => void;
}

function SwipeActionButton({ action, emphasized, onPress }: SwipeActionButtonProps) {
  const tint = action === "skipped" ? colors.danger : emphasized ? colors.surface : colors.primary;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.actionButton, emphasized ? styles.saveButton : null]}
    >
      <MaterialIcons color={tint} name={actionCopy[action].icon} size={30} />
      <Text style={emphasized ? styles.saveText : styles.actionText}>{actionCopy[action].label}</Text>
    </Pressable>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flex: 1,
    gap: 5,
    minHeight: 82,
    justifyContent: "center",
    ...shadow,
  },
  actionText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  card: {
    borderRadius: radius.xl,
    flex: 1,
    justifyContent: "space-between",
    minHeight: 360,
    overflow: "hidden",
    padding: spacing.md,
    ...shadow,
  },
  copy: {
    gap: spacing.xs,
  },
  counter: {
    backgroundColor: "rgba(255,255,255,0.86)",
    borderRadius: 999,
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  image: {
    ...StyleSheet.absoluteFill,
    height: "100%",
    width: "100%",
  },
  intent: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    color: colors.primary,
    fontSize: 26,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    textTransform: "uppercase",
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
    minHeight: 96,
  },
  saveText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: "900",
  },
  stage: {
    flex: 1,
    minHeight: 0,
  },
  stat: {
    alignItems: "center",
    flex: 1,
    gap: 2,
  },
  statLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    textAlign: "center",
  },
  statValue: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "900",
  },
  stats: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    padding: spacing.sm,
  },
  status: {
    color: colors.mutedStrong,
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 18,
    textAlign: "center",
  },
  title: {
    color: colors.surface,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 38,
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
