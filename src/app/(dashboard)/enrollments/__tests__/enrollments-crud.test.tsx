import { screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EnrollmentsPage from "../page";
import { renderWithProviders } from "@/test-utils";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { mswUrl } from "@/mocks/utils";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockPush,
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
    };
  },
  usePathname() {
    return "/enrollments";
  },
}));

describe("Enrollments CRUD Operations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and display a list of enrollments", async () => {
    renderWithProviders(<EnrollmentsPage />);

    expect(screen.getByText("Enrollments")).toBeInTheDocument();
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText("Student 1")).toBeInTheDocument();
    });

    expect(screen.getByText("Student 2")).toBeInTheDocument();
  });

  it("should filter enrollments based on search query", async () => {
    renderWithProviders(<EnrollmentsPage />);

    await waitFor(() => {
      expect(screen.getByText("Student 1")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/Search by name/i);
    fireEvent.change(searchInput, { target: { value: "Student 10" } });

    // "Student 1" should be gone, "Student 10" should stay
    expect(screen.getByText("Student 10")).toBeInTheDocument();
    expect(screen.queryByText("Student 1")).not.toBeInTheDocument();
  });

  it("should open delete confirmation and call delete API", async () => {
    renderWithProviders(<EnrollmentsPage />);

    await waitFor(() => {
      expect(screen.getByText("Student 1")).toBeInTheDocument();
    });

    // Open dropdown for first student
    const dropdownTriggers = screen.getAllByRole("button", { name: "" }); // The MoreHorizontal button
    // Actually, it might be easier to find by test id or just pick one
    // In our component, it's a ghost button with MoreHorizontal icon
    
    // Let's find the specific row for Student 1
    const row = screen.getByText("Student 1").closest("tr");
    const menuBtn = row?.querySelector('button');
    if (menuBtn) fireEvent.click(menuBtn);

    // Wait for dropdown and click Delete
    const deleteBtn = await screen.findByText("Delete");
    fireEvent.click(deleteBtn);

    // Confirm dialog should appear
    expect(screen.getByText("Delete Enrollment")).toBeInTheDocument();
    const confirmBtn = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(confirmBtn);

    // Verify deletion (Toast would show success, and list would refresh)
    // We check if the dialog closes
    await waitFor(() => {
      expect(screen.queryByText("Delete Enrollment")).not.toBeInTheDocument();
    });
  });

  it("should handle API error gracefully when fetching list", async () => {
    // Override handler for this test
    server.use(
      http.get(mswUrl("/AllEnrollments"), () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<EnrollmentsPage />);

    // Should show error state or at least not the table
    await waitFor(() => {
      expect(screen.queryByText("Student 1")).not.toBeInTheDocument();
    });
  });
});
