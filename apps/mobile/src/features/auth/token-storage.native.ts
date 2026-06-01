import * as SecureStore from "expo-secure-store";
import type { TokenStorage } from "@core/api";

const accessTokenKey = "corehfm.accessToken";

export const secureTokenStorage: TokenStorage = {
  async clear() {
    await SecureStore.deleteItemAsync(accessTokenKey);
  },
  async getAccessToken() {
    return SecureStore.getItemAsync(accessTokenKey);
  },
  async setAccessToken(token: string) {
    await SecureStore.setItemAsync(accessTokenKey, token);
  },
};
