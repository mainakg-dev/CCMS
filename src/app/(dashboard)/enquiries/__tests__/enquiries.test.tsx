import { screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EnquiriesPage from "../page";
import { renderWithProviders } from "@/test-utils";

describe("Enquiries Feature", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and display a list of enquiries", async () => {
    renderWithProviders(<EnquiriesPage />);

    await waitFor(() => {
      expect(screen.getByText(/Franchise Enquiries/i)).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    });
  });

  it("should open delete confirmation for an enquiry", async () => {
    renderWithProviders(<EnquiriesPage />);

    await waitFor(() => {
      expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    });

    // Find the delete button in the row
    const deleteBtn = screen.getByRole("button", { name: "" }); // The ghost button with Trash2
    // Wait, let's be more specific
    const row = screen.getByText(/Jane Smith/i).closest("tr");
    const delBtn = row?.querySelector('button.text-destructive');
    if (delBtn) fireEvent.click(delBtn);

    await waitFor(() => {
      expect(screen.getByText(/Delete Enquiry/i)).toBeInTheDocument();
    });
  });
});
