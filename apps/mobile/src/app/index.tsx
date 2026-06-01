import { Redirect } from "expo-router";
import { useAuthStore } from "@/features/auth/store";

export default function IndexRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return <Redirect href={isAuthenticated ? "/(tabs)/discover" : "/(auth)/login"} />;
}
