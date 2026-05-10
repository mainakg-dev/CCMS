import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CentersPage from "../page";
import { renderWithProviders } from "@/test-utils";

describe("Centers Feature", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and display a list of centers", async () => {
    renderWithProviders(<CentersPage />);

    expect(screen.getByText("Centers")).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(/Main Campus/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/North Branch/i)).toBeInTheDocument();
  });
});
