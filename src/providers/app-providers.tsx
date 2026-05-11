"use client";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getQueryClient } from "@/lib/query-client";
import { MSWProvider } from "@/providers/msw-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MSWProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster richColors position="top-right" />

        <ReactQueryDevtools initialIsOpen={false} />
      </MSWProvider>
    </QueryClientProvider>
  );
}
