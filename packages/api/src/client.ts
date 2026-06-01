import { ApiError } from "./errors";
import { MemoryTokenStorage, type TokenStorage } from "./auth-token-provider";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export interface ApiClientOptions {
  baseUrl: string;
  tokenStorage?: TokenStorage;
  onUnauthorized?: () => Promise<void> | void;
}

export class ApiClient {
  private readonly tokenStorage: TokenStorage;

  constructor(private readonly options: ApiClientOptions) {
    this.tokenStorage = options.tokenStorage ?? new MemoryTokenStorage();
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const token = await this.tokenStorage.getAccessToken();
    const headers = new Headers(options.headers);

    headers.set("Accept", "application/json");

    if (options.body !== undefined) {
      headers.set("Content-Type", "application/json");
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(new URL(path, this.options.baseUrl), {
      ...options,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      headers,
    });

    if (response.status === 401) {
      await this.options.onUnauthorized?.();
    }

    if (!response.ok) {
      throw new ApiError(
        response.statusText || "Request failed",
        response.status,
        await readBody(response)
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }

  get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, body, method: "POST" });
  }
}

async function readBody(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
