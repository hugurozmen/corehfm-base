import type { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "@core/api";

const routerBaseName = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL;

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={routerBaseName}>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}
