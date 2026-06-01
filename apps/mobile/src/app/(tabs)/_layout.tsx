import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { cafinderTheme } from "@/features/cafinder/theme";

type TabIcon = keyof typeof MaterialIcons.glyphMap;

const { colors } = cafinderTheme;

function tabIcon(name: TabIcon) {
  return ({ color, size }: { color: unknown; size: number }) => (
    <MaterialIcons color={String(color)} name={name} size={size} />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "800",
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 72,
          paddingBottom: 10,
          paddingTop: 8,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.08,
          shadowRadius: 18,
        },
      }}
    >
      <Tabs.Screen
        name="discover"
        options={{ tabBarIcon: tabIcon("explore"), title: "Kesfet" }}
      />
      <Tabs.Screen name="map" options={{ tabBarIcon: tabIcon("map"), title: "Harita" }} />
      <Tabs.Screen
        name="lists"
        options={{ tabBarIcon: tabIcon("format-list-bulleted"), title: "Listeler" }}
      />
      <Tabs.Screen
        name="plan"
        options={{ tabBarIcon: tabIcon("calendar-today"), title: "Planla" }}
      />
      <Tabs.Screen
        name="profile"
        options={{ tabBarIcon: tabIcon("person"), title: "Profil" }}
      />
    </Tabs>
  );
}
