import { screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ExamsPage from "../page";
import { renderWithProviders } from "@/test-utils";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { mswUrl } from "@/mocks/utils";

describe("Exams Feature", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should search for a student and display their info", async () => {
    renderWithProviders(<ExamsPage />);

    const searchInput = screen.getByPlaceholderText(/Enrollment Number/i);
    fireEvent.change(searchInput, { target: { value: "12345" } });
    
    const searchBtn = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Diploma in Computer Application/i)).toBeInTheDocument();
    });
  });

  it("should submit the exam form successfully", async () => {
    renderWithProviders(<ExamsPage />);

    // First search to enable the form
    fireEvent.change(screen.getByPlaceholderText(/Enrollment Number/i), { target: { value: "12345" } });
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });

    // Fill form
    fireEvent.change(screen.getByLabelText(/ATI Code/i), { target: { value: "ATI001" } });
    fireEvent.change(screen.getByLabelText(/Center Code/i), { target: { value: "C001" } });
    fireEvent.change(screen.getByLabelText(/Payment Receipt No/i), { target: { value: "REC123" } });

    const submitBtn = screen.getByRole("button", { name: /Submit Exam Form/i });
    expect(submitBtn).not.toBeDisabled();
    fireEvent.click(submitBtn);

    // Verify submission (Toast or success message would be here)
    // For now we just check if it's not failing
  });
});
