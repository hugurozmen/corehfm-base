import { useMemo, useState } from "react";
import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton } from "@/features/cafinder/components/CafinderUi";
import { atmosphereOptions } from "@/features/cafinder/data/cafinder-data";
import { cafinderTheme, shadow } from "@/features/cafinder/theme";
import { useAuthStore } from "@/features/auth/store";

type OnboardingStep = "welcome" | "phone" | "verify" | "location" | "mood";

const { colors, radius, spacing } = cafinderTheme;

const stepOrder: OnboardingStep[] = ["welcome", "phone", "verify", "location", "mood"];

export default function LoginScreen() {
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [phone, setPhone] = useState("5");
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const activeIndex = stepOrder.indexOf(step);

  const buttonLabel = useMemo(() => {
    if (step === "welcome") {
      return "Basla";
    }

    if (step === "phone") {
      return "Kodu Gonder";
    }

    if (step === "verify") {
      return "Dogrula";
    }

    if (step === "location") {
      return "Konuma Izin Ver";
    }

    return "Sonuclari Gor";
  }, [step]);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/discover" />;
  }

  function nextStep() {
    if (step === "mood") {
      login("deniz@cafinder.app");
      return;
    }

    setStep(stepOrder[activeIndex + 1] ?? "mood");
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.brandRow}>
        <View style={styles.logo}>
          <MaterialIcons color={colors.primary} name="local-cafe" size={25} />
        </View>
        <View>
          <Text style={styles.brand}>Cafinder</Text>
          <Text style={styles.brandSub}>Curated coffee culture</Text>
        </View>
      </View>

      <View style={styles.progressRow}>
        {stepOrder.map((item) => (
          <View
            key={item}
            style={[styles.progressDot, stepOrder.indexOf(item) <= activeIndex ? styles.progressDotActive : null]}
          />
        ))}
      </View>

      {step === "welcome" ? <WelcomeStep /> : null}
      {step === "phone" ? <PhoneStep phone={phone} setPhone={setPhone} /> : null}
      {step === "verify" ? <VerifyStep /> : null}
      {step === "location" ? <LocationStep onLater={nextStep} /> : null}
      {step === "mood" ? <MoodStep /> : null}

      <View style={styles.footer}>
        {step !== "welcome" ? (
          <PrimaryButton
            icon="arrow-back"
            label="Geri"
            onPress={() => setStep(stepOrder[Math.max(activeIndex - 1, 0)])}
            variant="ghost"
          />
        ) : null}
        <PrimaryButton icon="arrow-forward" label={buttonLabel} onPress={nextStep} />
      </View>
    </SafeAreaView>
  );
}

function WelcomeStep() {
  return (
    <View style={styles.panel}>
      <ImageBackground
        imageStyle={styles.heroImage}
        source={{
          uri: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
        }}
        style={styles.hero}
      >
        <View style={styles.heroShade} />
        <Text style={styles.heroKicker}>Istanbul kahve rehberi</Text>
        <Text style={styles.heroTitle}>Sehrin en iyi koselerini kesfet</Text>
      </ImageBackground>
      <Text style={styles.title}>Mooduna ve zevkine en uygun mekanlari saniyeler icinde bul.</Text>
      <Text style={styles.description}>
        Calismak, bulusmak, tatli yemek veya iyi bir V60 icin sicak, modern ve secilmis rotalar.
      </Text>
    </View>
  );
}

interface PhoneStepProps {
  phone: string;
  setPhone(phone: string): void;
}

function PhoneStep({ phone, setPhone }: PhoneStepProps) {
  return (
    <View style={styles.panel}>
      <MaterialIcons color={colors.primary} name="phone-iphone" size={34} />
      <Text style={styles.title}>Telefon numarani dogrula</Text>
      <Text style={styles.description}>
        Hesabini guvene almak icin 6 haneli bir dogrulama kodu gonderecegiz.
      </Text>
      <View style={styles.phoneInputRow}>
        <View style={styles.countryCode}>
          <Text style={styles.countryFlag}>TR</Text>
          <Text style={styles.countryText}>+90</Text>
        </View>
        <TextInput
          keyboardType="phone-pad"
          onChangeText={setPhone}
          placeholder="5-- --- -- --"
          placeholderTextColor={colors.muted}
          style={styles.phoneInput}
          value={phone}
        />
      </View>
      <View style={styles.keypad}>
        {["1", "2 ABC", "3 DEF", "4 GHI", "5 JKL", "6 MNO", "7 PQRS", "8 TUV", "9 WXYZ", "0"].map((key) => (
          <Pressable key={key} style={styles.key}>
            <Text style={styles.keyText}>{key}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function VerifyStep() {
  return (
    <View style={styles.panel}>
      <MaterialIcons color={colors.primary} name="dialpad" size={34} />
      <Text style={styles.title}>Dogrulama kodu</Text>
      <Text style={styles.description}>+90 5** *** ** 42 numarasina gonderilen kodu gir.</Text>
      <View style={styles.otpRow}>
        {["1", "8", "", "", "", ""].map((digit, index) => (
          <View key={`${digit}-${index}`} style={styles.otpBox}>
            <Text style={styles.otpText}>{digit}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.resend}>Kodu alamadin mi? Tekrar gonder</Text>
    </View>
  );
}

interface LocationStepProps {
  onLater(): void;
}

function LocationStep({ onLater }: LocationStepProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.locationCluster}>
        <View style={[styles.locationBubble, styles.locationBubbleMain]}>
          <MaterialIcons color={colors.surface} name="location-on" size={32} />
        </View>
        <View style={styles.locationBubble}>
          <MaterialIcons color={colors.primary} name="local-cafe" size={24} />
        </View>
        <View style={styles.locationBubbleSmall}>
          <MaterialIcons color={colors.primary} name="storefront" size={20} />
        </View>
      </View>
      <Text style={styles.title}>Sana yakin mekanlari gosterelim</Text>
      <Text style={styles.description}>
        En iyi kahvecileri ve gizli kalmis mekanlari kesfetmek icin konum izni ver.
      </Text>
      <Pressable onPress={onLater}>
        <Text style={styles.resend}>Daha sonra</Text>
      </Pressable>
    </View>
  );
}

function MoodStep() {
  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Nasil bir ortam ariyorsun?</Text>
      <Text style={styles.description}>Sana en uygun kafeleri bulmamiz icin modunu sec.</Text>
      <View style={styles.cityRow}>
        {["Istanbul", "Kadikoy", "Besiktas"].map((city, index) => (
          <Text key={city} style={[styles.cityChip, index === 0 ? styles.cityChipActive : null]}>
            {city}
          </Text>
        ))}
      </View>
      <View style={styles.moodGrid}>
        {atmosphereOptions.map((option, index) => (
          <View key={option.title} style={[styles.moodCard, index === 0 ? styles.moodCardActive : null]}>
            <MaterialIcons
              color={index === 0 ? colors.surface : colors.primary}
              name={option.icon}
              size={24}
            />
            <Text style={[styles.moodTitle, index === 0 ? styles.moodTitleActive : null]}>
              {option.title}
            </Text>
            <Text style={[styles.moodSubtitle, index === 0 ? styles.moodSubtitleActive : null]}>
              {option.subtitle}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  brand: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0,
  },
  brandRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  brandSub: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  cityChip: {
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900",
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
  },
  cityChipActive: {
    backgroundColor: colors.primary,
    color: colors.surface,
  },
  cityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  countryCode: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.md,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: spacing.md,
  },
  countryFlag: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900",
  },
  countryText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "900",
  },
  description: {
    color: colors.mutedStrong,
    fontSize: 15,
    lineHeight: 23,
  },
  footer: {
    gap: spacing.sm,
    padding: spacing.lg,
  },
  hero: {
    height: 260,
    justifyContent: "flex-end",
    overflow: "hidden",
    padding: spacing.lg,
  },
  heroImage: {
    borderRadius: radius.xl,
  },
  heroKicker: {
    color: colors.surfaceWarm,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(42, 26, 20, 0.34)",
    borderRadius: radius.xl,
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 35,
    marginTop: spacing.xs,
  },
  key: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.md,
    minHeight: 48,
    justifyContent: "center",
    width: "30%",
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    justifyContent: "center",
  },
  keyText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900",
  },
  locationBubble: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    height: 58,
    justifyContent: "center",
    width: 58,
  },
  locationBubbleMain: {
    backgroundColor: colors.primary,
    height: 82,
    width: 82,
  },
  locationBubbleSmall: {
    alignItems: "center",
    backgroundColor: colors.backgroundAlt,
    borderRadius: 999,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  locationCluster: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  logo: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  moodCard: {
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: 4,
    padding: spacing.md,
    width: "48%",
  },
  moodCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  moodSubtitle: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  moodSubtitleActive: {
    color: colors.surfaceWarm,
  },
  moodTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900",
  },
  moodTitleActive: {
    color: colors.surface,
  },
  otpBox: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    height: 54,
    justifyContent: "center",
    width: 44,
  },
  otpRow: {
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
  },
  otpText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "900",
  },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
    margin: spacing.lg,
    padding: spacing.lg,
    ...shadow,
  },
  phoneInput: {
    color: colors.ink,
    flex: 1,
    fontSize: 18,
    fontWeight: "900",
  },
  phoneInputRow: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 58,
    padding: spacing.xs,
  },
  progressDot: {
    backgroundColor: colors.border,
    borderRadius: 999,
    flex: 1,
    height: 5,
  },
  progressDotActive: {
    backgroundColor: colors.primary,
  },
  progressRow: {
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  resend: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 31,
  },
});
