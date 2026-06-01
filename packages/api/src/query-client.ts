import { QueryClient } from "@tanstack/react-query";

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 10,
        retry: 1,
        staleTime: 1000 * 30,
      },
    },
  });
}

export const queryClient = createQueryClient();
