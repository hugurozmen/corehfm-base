import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Cafinder",
  slug: "cafinder",
  version: "1.0.0",
  scheme: "cafinder",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true,
  },
  ios: {
    bundleIdentifier: "com.hugurozmen.cafinder",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    supportsTablet: true,
  },
  android: {
    package: "com.hugurozmen.cafinder",
    adaptiveIcon: {
      backgroundColor: "#FFF8F5",
      backgroundImage: "./assets/android-icon-background.png",
      foregroundImage: "./assets/android-icon-foreground.png",
      monochromeImage: "./assets/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? "development",
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
    eas: {
      projectId: "16353579-c1ec-461e-8e1a-be33a862f0d0",
    },
  },
};

export default config;
