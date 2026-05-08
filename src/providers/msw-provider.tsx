"use client";

import { useEffect, useState } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mockingEnabled, setMockingEnabled] = useState(false);

  useEffect(() => {
    async function enableMocking() {
      if (
        typeof window !== "undefined" &&
        process.env.NEXT_PUBLIC_API_MOCKING === "true"
      ) {
        const { worker } = await import("@/mocks/browser");
        // Start the worker and wait until it's ready to intercept requests
        await worker.start({
          onUnhandledRequest: "bypass",
        });
      }
      setMockingEnabled(true);
    }

    enableMocking();
  }, []);

  // We only want to render the application once MSW has started,
  // otherwise React Query might make requests before MSW is ready.
  // If mocking isn't enabled via env var, it will resolve immediately.
  if (!mockingEnabled) {
    return null;
  }

  return <>{children}</>;
}
