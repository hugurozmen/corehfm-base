import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@core/api";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="discover-swipe" />
        <Stack.Screen name="filters" />
        <Stack.Screen name="flow/atmosphere" />
        <Stack.Screen name="flow/city" />
        <Stack.Screen name="flow/location" />
        <Stack.Screen name="flow/onboarding" />
        <Stack.Screen name="flow/phone" />
        <Stack.Screen name="flow/splash" />
        <Stack.Screen name="flow/verify" />
        <Stack.Screen name="lists/new" />
        <Stack.Screen name="place/[id]" />
        <Stack.Screen name="plan/new" />
        <Stack.Screen name="profile/detail" />
        <Stack.Screen name="saved" />
        <Stack.Screen name="screens" />
      </Stack>
      <StatusBar style="dark" />
    </QueryClientProvider>
  );
}
