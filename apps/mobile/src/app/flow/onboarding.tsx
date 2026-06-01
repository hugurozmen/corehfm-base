import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { PrimaryButton, Screen } from "@/features/cafinder/components/CafinderUi";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";

const { colors, radius, spacing } = cafinderTheme;

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <Screen>
      <ImageBackground
        imageStyle={styles.image}
        source={{
          uri: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
        }}
        style={styles.hero}
      >
        <View style={styles.overlay} />
        <Text style={styles.kicker}>Istanbul kahve rehberi</Text>
        <Text style={styles.title}>Sehrin en iyi koselerini kesfet</Text>
      </ImageBackground>
      <View style={styles.copyBlock}>
        <Text style={styles.heading}>Mooduna ve zevkine en uygun mekanlari saniyeler icinde bul.</Text>
        <Text style={styles.copy}>
          Calismak, bulusmak, tatli yemek veya iyi bir V60 icin sicak, modern ve secilmis rotalar.
        </Text>
      </View>
      <PrimaryButton icon="arrow-forward" label="Basla" onPress={() => router.push("/flow/phone")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  copy: {
    color: colors.mutedStrong,
    fontSize: 15,
    lineHeight: 23,
  },
  copyBlock: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
    ...shadow,
  },
  heading: {
    color: colors.ink,
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 30,
  },
  hero: {
    borderRadius: radius.xl,
    height: 430,
    justifyContent: "flex-end",
    overflow: "hidden",
    padding: spacing.lg,
    ...shadow,
  },
  image: {
    borderRadius: radius.xl,
  },
  kicker: {
    color: colors.surfaceWarm,
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(42, 26, 20, 0.35)",
  },
  title: {
    color: colors.surface,
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 40,
    maxWidth: 310,
  },
});
