import { screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SettingsPage from "../page";
import { renderWithProviders } from "@/test-utils";

describe("Settings Feature", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should validate password change form", async () => {
    renderWithProviders(<SettingsPage />);

    const submitBtn = screen.getByRole("button", { name: /Update Password/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
  });
});
