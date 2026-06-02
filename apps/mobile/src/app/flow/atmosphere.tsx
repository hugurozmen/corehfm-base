import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppHeader, PrimaryButton, Screen } from "@/features/cafinder/components/CafinderUi";
import { atmosphereOptions } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";
import { useAuthStore } from "@/features/auth/store";

const { colors, radius, spacing } = cafinderTheme;

export default function AtmosphereScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [selectedMood, setSelectedMood] = useState<string>(atmosphereOptions[0]!.title);

  return (
    <Screen>
      <AppHeader subtitle="Sana uygun oneriler icin" title="Nasil bir ortam ariyorsun?" />
      <Text style={styles.copy}>Modunu sec, Cafinder sana en uygun kahve rotalarini one cikarir.</Text>
      <View style={styles.grid}>
        {atmosphereOptions.map((option) => {
          const active = selectedMood === option.title;

          return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            key={option.title}
            onPress={() => setSelectedMood(option.title)}
            style={[styles.card, active ? styles.cardActive : null]}
          >
            <MaterialIcons
              color={active ? colors.surface : colors.primary}
              name={option.icon}
              size={26}
            />
            <Text style={[styles.title, active ? styles.titleActive : null]}>{option.title}</Text>
            <Text style={[styles.subtitle, active ? styles.subtitleActive : null]}>
              {option.subtitle}
            </Text>
          </Pressable>
        );
        })}
      </View>
      <PrimaryButton
        icon="arrow-forward"
        label="Sonuclari Gor"
        onPress={() => {
          login("deniz@cafinder.app");
          router.replace("/(tabs)/discover");
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: 5,
    minHeight: 128,
    padding: spacing.md,
    width: "48%",
    ...shadow,
  },
  cardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  copy: {
    color: colors.mutedStrong,
    fontSize: 15,
    lineHeight: 23,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  subtitleActive: {
    color: colors.surfaceWarm,
  },
  title: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "900",
  },
  titleActive: {
    color: colors.surface,
  },
});
