import { screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import NoticesPage from "../page";
import { renderWithProviders } from "@/test-utils";

describe("Notices Feature", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should open create notice dialog and submit", async () => {
    renderWithProviders(<NoticesPage />);

    expect(screen.getByText(/Notice Board/i)).toBeInTheDocument();
    
    // Open dialog
    const createBtn = screen.getByText(/New Notice/i).closest("button")!;
    fireEvent.click(createBtn);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Create Notice" })).toBeInTheDocument();
    });

    // Fill form
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Test Notice Title" } });
    fireEvent.change(screen.getByLabelText(/Content/i), { target: { value: "Test Notice Content" } });

    const submitBtn = screen.getByRole("button", { name: /Publish Notice/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.queryByText("Create Notice")).not.toBeInTheDocument();
    });
  });
});
