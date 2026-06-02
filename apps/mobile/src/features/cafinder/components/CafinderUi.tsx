import type { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Cafe, CafeList } from "../data/cafinder-data";
import { cafinderTheme, shadow } from "../theme";

type IconName = ComponentProps<typeof MaterialIcons>["name"];

const { colors, radius, spacing } = cafinderTheme;

interface ScreenProps extends PropsWithChildren {
  footer?: ReactNode;
  scroll?: boolean;
}

export function Screen({ children, footer, scroll = true }: ScreenProps) {
  const content = scroll ? (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={styles.staticContent}>{children}</View>
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      {content}
      {footer}
    </SafeAreaView>
  );
}

interface AppHeaderProps {
  actionIcon?: IconName;
  eyebrow?: string;
  onAction?: () => void;
  subtitle?: string;
  title: string;
}

export function AppHeader({ actionIcon, eyebrow, onAction, subtitle, title }: AppHeaderProps) {
  const resolvedActionIcon = actionIcon ?? (onAction ? "tune" : undefined);

  return (
    <View style={styles.header}>
      <View style={styles.logoMark}>
        <MaterialIcons color={colors.primary} name="local-cafe" size={22} />
      </View>
      <View style={styles.headerCopy}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text numberOfLines={1} style={styles.headerTitle}>
          {title}
        </Text>
        {subtitle ? (
          <Text numberOfLines={1} style={styles.headerSubtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {resolvedActionIcon ? <IconButton icon={resolvedActionIcon} onPress={onAction} /> : null}
    </View>
  );
}

interface IconButtonProps {
  icon: IconName;
  onPress?: () => void;
  tone?: "light" | "dark";
}

export function IconButton({ icon, onPress, tone = "light" }: IconButtonProps) {
  const content = (
    <MaterialIcons
      color={tone === "dark" ? colors.surface : colors.primary}
      name={icon}
      size={22}
    />
  );

  if (!onPress) {
    return (
      <View
        accessibilityElementsHidden
        importantForAccessibility="no"
        style={[styles.iconButton, tone === "dark" ? styles.iconButtonDark : null]}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.iconButton, tone === "dark" ? styles.iconButtonDark : null]}
    >
      {content}
    </Pressable>
  );
}

interface SearchBarProps {
  onChangeText?: (value: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
  value?: string;
}

export function SearchBar({
  onChangeText,
  onFilterPress,
  placeholder = "Mekan veya mutfak ara...",
  value,
}: SearchBarProps) {
  return (
    <View style={styles.searchBar}>
      <MaterialIcons color={colors.muted} name="search" size={21} />
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={styles.searchInput}
        value={value}
      />
      {onFilterPress ? (
        <Pressable accessibilityRole="button" onPress={onFilterPress} style={styles.searchFilterButton}>
          <MaterialIcons color={colors.primary} name="tune" size={20} />
        </Pressable>
      ) : null}
    </View>
  );
}

interface ChipProps {
  active?: boolean;
  icon?: IconName;
  label: string;
  onPress?: () => void;
}

export function Chip({ active, icon, label, onPress }: ChipProps) {
  const content = (
    <>
      {icon ? (
        <MaterialIcons
          color={active ? colors.surface : colors.primary}
          name={icon}
          size={16}
        />
      ) : null}
      <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>{label}</Text>
    </>
  );

  if (!onPress) {
    return <View style={[styles.chip, active ? styles.chipActive : null]}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: Boolean(active) }}
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : null]}
    >
      {content}
    </Pressable>
  );
}

interface SectionTitleProps {
  action?: string;
  onActionPress?: () => void;
  title: string;
}

export function SectionTitle({ action, onActionPress, title }: SectionTitleProps) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionHeading}>{title}</Text>
      {action && onActionPress ? (
        <Pressable accessibilityRole="button" onPress={onActionPress}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : action ? (
        <Text style={styles.sectionAction}>{action}</Text>
      ) : null}
    </View>
  );
}

interface CafeCardProps {
  cafe: Cafe;
  compact?: boolean;
}

export function CafeCard({ cafe, compact = false }: CafeCardProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        router.push({ pathname: "/place/[id]", params: { id: cafe.id } });
      }}
      style={[styles.cafeCard, compact ? styles.cafeCardCompact : null]}
    >
      <Image source={{ uri: cafe.imageUrl }} style={compact ? styles.cafeImageCompact : styles.cafeImage} />
      <View style={styles.cafeBody}>
        <View style={styles.cardTopRow}>
          <View style={styles.cafeTitleGroup}>
            <Text numberOfLines={1} style={styles.cafeName}>
              {cafe.name}
            </Text>
            <Text numberOfLines={1} style={styles.cafeMeta}>
              {cafe.category} • {cafe.area}
            </Text>
          </View>
          <View style={styles.ratingBadge}>
            <MaterialIcons color={colors.warning} name="star" size={15} />
            <Text style={styles.ratingText}>{cafe.rating}</Text>
          </View>
        </View>
        {!compact ? (
          <Text numberOfLines={2} style={styles.cafeDescription}>
            {cafe.description}
          </Text>
        ) : null}
        <View style={styles.tagRow}>
          {cafe.tags.slice(0, compact ? 2 : 3).map((tag) => (
            <Text key={tag} style={styles.smallTag}>
              {tag}
            </Text>
          ))}
          <Text style={styles.distanceTag}>{cafe.distance}</Text>
        </View>
      </View>
    </Pressable>
  );
}

interface HeroCafeCardProps {
  cafe: Cafe;
}

export function HeroCafeCard({ cafe }: HeroCafeCardProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        router.push({ pathname: "/place/[id]", params: { id: cafe.id } });
      }}
      style={styles.heroCard}
    >
      <Image source={{ uri: cafe.imageUrl }} style={styles.heroImage} />
      <View style={styles.heroOverlay} />
      <IconButton icon="favorite" tone="light" />
      <View style={styles.heroCopy}>
        <Text style={styles.heroKicker}>Bugunun rotasi</Text>
        <Text style={styles.heroTitle}>{cafe.name}</Text>
        <Text style={styles.heroMeta}>
          {cafe.area} • {cafe.distance} • {cafe.price}
        </Text>
      </View>
    </Pressable>
  );
}

interface ListCardProps {
  item: CafeList;
  onPress?: () => void;
}

export function ListCard({ item, onPress }: ListCardProps) {
  const content = (
    <>
      <Image source={{ uri: item.imageUrl }} style={styles.listImage} />
      <View style={styles.listCopy}>
        <Text style={styles.listCount}>{item.count} mekan</Text>
        <Text style={styles.listTitle}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.listDescription}>
          {item.description}
        </Text>
      </View>
      <MaterialIcons color={colors.primary} name="chevron-right" size={24} />
    </>
  );

  if (!onPress) {
    return <View style={styles.listCard}>{content}</View>;
  }

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.listCard}>
      {content}
    </Pressable>
  );
}

interface SettingRowProps {
  icon: IconName;
  label: string;
  onPress?: () => void;
}

export function SettingRow({ icon, label, onPress }: SettingRowProps) {
  return (
    <Pressable onPress={onPress} style={styles.settingRow}>
      <View style={styles.settingIcon}>
        <MaterialIcons color={colors.primary} name={icon} size={20} />
      </View>
      <Text style={styles.settingLabel}>{label}</Text>
      <MaterialIcons color={colors.muted} name="chevron-right" size={22} />
    </Pressable>
  );
}

interface PrimaryButtonProps {
  icon?: IconName;
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost";
}

export function PrimaryButton({ icon, label, onPress, variant = "primary" }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.primaryButton,
        variant === "secondary" ? styles.secondaryButton : null,
        variant === "ghost" ? styles.ghostButton : null,
      ]}
    >
      {icon ? (
        <MaterialIcons
          color={variant === "primary" ? colors.surface : colors.primary}
          name={icon}
          size={20}
        />
      ) : null}
      <Text
        style={[
          styles.primaryButtonText,
          variant === "primary" ? null : styles.secondaryButtonText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cafeBody: {
    flex: 1,
    gap: spacing.sm,
    padding: spacing.md,
  },
  cafeCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: "hidden",
    ...shadow,
  },
  cafeCardCompact: {
    flexDirection: "row",
  },
  cafeDescription: {
    color: colors.mutedStrong,
    fontSize: 14,
    lineHeight: 20,
  },
  cafeImage: {
    height: 170,
    width: "100%",
  },
  cafeImageCompact: {
    height: 116,
    width: 104,
  },
  cafeMeta: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  cafeName: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "800",
  },
  cafeTitleGroup: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  cardTopRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
  },
  chip: {
    alignItems: "center",
    backgroundColor: colors.chip,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
  },
  chipTextActive: {
    color: colors.surface,
  },
  distanceTag: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    marginLeft: "auto",
  },
  eyebrow: {
    color: colors.secondary,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  ghostButton: {
    backgroundColor: "transparent",
    borderColor: colors.border,
    borderWidth: 1,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  headerCopy: {
    flex: 1,
    minWidth: 0,
  },
  headerSubtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2,
  },
  headerTitle: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 0,
  },
  heroCard: {
    borderRadius: radius.xl,
    height: 300,
    justifyContent: "space-between",
    overflow: "hidden",
    padding: spacing.md,
    ...shadow,
  },
  heroCopy: {
    gap: spacing.xs,
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    height: "100%",
    width: "100%",
  },
  heroKicker: {
    color: colors.surfaceWarm,
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  heroMeta: {
    color: colors.surfaceWarm,
    fontSize: 14,
    fontWeight: "700",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(42, 26, 20, 0.36)",
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0,
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  iconButtonDark: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  listCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.sm,
    ...shadow,
  },
  listCopy: {
    flex: 1,
    gap: 3,
  },
  listCount: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  listDescription: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  listImage: {
    borderRadius: radius.md,
    height: 88,
    width: 88,
  },
  listTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
  },
  logoMark: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: spacing.lg,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "900",
  },
  ratingBadge: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    flexDirection: "row",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  ratingText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    gap: spacing.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  searchBar: {
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
  searchInput: {
    color: colors.ink,
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    minWidth: 0,
  },
  searchFilterButton: {
    alignItems: "center",
    borderRadius: 999,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  secondaryButton: {
    backgroundColor: colors.surfaceWarm,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  sectionAction: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900",
  },
  sectionHeading: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0,
  },
  sectionTitle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  settingIcon: {
    alignItems: "center",
    backgroundColor: colors.surfaceWarm,
    borderRadius: radius.md,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  settingLabel: {
    color: colors.ink,
    flex: 1,
    fontSize: 15,
    fontWeight: "800",
  },
  settingRow: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
  },
  smallTag: {
    backgroundColor: colors.surfaceWarm,
    borderRadius: 999,
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  staticContent: {
    flex: 1,
    gap: spacing.lg,
    padding: spacing.lg,
  },
  tagRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
});
