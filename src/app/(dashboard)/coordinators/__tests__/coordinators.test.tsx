import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CoordinatorsPage from "../page";
import { renderWithProviders } from "@/test-utils";

describe("Coordinators Feature", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and display a list of coordinators", async () => {
    renderWithProviders(<CoordinatorsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Admin User/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/ADMIN/i)).toBeInTheDocument();
  });
});
