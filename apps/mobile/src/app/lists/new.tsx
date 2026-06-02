import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppHeader, PrimaryButton, Screen, SectionTitle } from "@/features/cafinder/components/CafinderUi";
import { cafes } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

export default function NewListScreen() {
  const router = useRouter();
  const [privacy, setPrivacy] = useState<"private" | "public">("private");
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<string[]>([cafes[0]!.id, cafes[1]!.id]);

  function togglePlace(id: string) {
    setSelectedPlaceIds((current) => (
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    ));
  }

  return (
    <Screen>
      <AppHeader actionIcon="close" onAction={() => router.back()} subtitle="Kendi kesif rotani yarat" title="Yeni Liste" />
      <View style={styles.formCard}>
        <Text style={styles.label}>Liste Adi</Text>
        <TextInput
          placeholder="Orn: Hafta Sonu Favorileri"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        <Text style={styles.label}>Aciklama</Text>
        <TextInput
          multiline
          placeholder="Bu liste hakkinda kisa bir bilgi verin..."
          placeholderTextColor={colors.muted}
          style={[styles.input, styles.textArea]}
        />
      </View>
      <SectionTitle title="Gizlilik" />
      <View style={styles.privacyRow}>
        <PrivacyButton active={privacy === "private"} label="Gizli" onPress={() => setPrivacy("private")} />
        <PrivacyButton active={privacy === "public"} label="Herkese Acik" onPress={() => setPrivacy("public")} />
      </View>
      <SectionTitle action="Ara" title="Mekan Ekle" />
      {cafes.slice(0, 3).map((cafe) => {
        const selected = selectedPlaceIds.includes(cafe.id);

        return (
        <View key={cafe.id} style={styles.placeRow}>
          <Pressable
            accessibilityLabel={selected ? `${cafe.name} kaldir` : `${cafe.name} ekle`}
            accessibilityRole="button"
            onPress={() => togglePlace(cafe.id)}
            style={styles.removeButton}
          >
            <MaterialIcons color={selected ? colors.danger : colors.primary} name={selected ? "remove" : "add"} size={20} />
          </Pressable>
          <Image source={{ uri: cafe.imageUrl }} style={styles.placeImage} />
          <Text style={styles.placeName}>{cafe.name}</Text>
        </View>
        );
      })}
      <PrimaryButton icon="check" label="Olustur" onPress={() => router.push("/(tabs)/lists")} />
    </Screen>
  );
}

function PrivacyButton({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[styles.privacyButton, active ? styles.privacyButtonActive : null]}
    >
      <Text style={[styles.privacyButtonText, active ? styles.privacyButtonTextActive : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md,
  },
  input: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800",
    padding: spacing.md,
  },
  label: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900",
  },
  placeImage: {
    borderRadius: radius.md,
    height: 58,
    width: 58,
  },
  placeName: {
    color: colors.ink,
    flex: 1,
    fontSize: 15,
    fontWeight: "900",
  },
  placeRow: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.sm,
  },
  privacyButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    padding: spacing.md,
  },
  privacyButtonActive: {
    backgroundColor: colors.primary,
  },
  privacyButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },
  privacyButtonTextActive: {
    color: colors.surface,
  },
  privacyRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  removeButton: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  textArea: {
    minHeight: 112,
    textAlignVertical: "top",
  },
});
