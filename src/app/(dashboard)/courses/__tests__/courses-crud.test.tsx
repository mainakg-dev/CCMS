import { screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CoursesPage from "../page";
import { renderWithProviders } from "@/test-utils";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { mswUrl } from "@/mocks/utils";

describe("Courses CRUD Operations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const waitForLoading = async () => {
    renderWithProviders(<CoursesPage />);
    await waitFor(() => {
      expect(screen.getByText("Diploma in Computer Application")).toBeInTheDocument();
    });
  };

  it("should fetch and display a list of courses", async () => {
    await waitForLoading();
    expect(screen.getByText("Advanced Excel")).toBeInTheDocument();
  });

  it("should expand a course to show subjects", async () => {
    await waitForLoading();
    fireEvent.click(screen.getByText("Diploma in Computer Application"));
    await waitFor(() => {
      expect(screen.getByText("Computer Fundamentals")).toBeInTheDocument();
    });
  });

  it("should open 'New Course' dialog and submit", async () => {
    await waitForLoading();

    const newBtn = screen.getByText(/New Course/i).closest("button")!;
    fireEvent.click(newBtn);

    // Wait for Dialog Title
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Create Course/i })).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText(/Course Name/i);
    fireEvent.change(nameInput, { target: { value: "New Mock Course" } });

    // Find the submit button specifically
    const submitBtn = screen.getAllByRole("button", { name: /Create Course/i }).find(btn => btn.getAttribute("type") === "submit")!;
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: /Create Course/i })).not.toBeInTheDocument();
    });
  });

  it("should handle validation errors", async () => {
    await waitForLoading();
    fireEvent.click(screen.getByText(/New Course/i).closest("button")!);
    
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Create Course/i })).toBeInTheDocument();
    });

    const submitBtn = screen.getAllByRole("button", { name: /Create Course/i }).find(btn => btn.getAttribute("type") === "submit")!;
    fireEvent.click(submitBtn);

    await waitFor(() => {
       expect(screen.getByText(/character/i)).toBeInTheDocument();
    });
  });

  it("should handle API error gracefully", async () => {
    server.use(
      http.post(mswUrl("/createCourse"), () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await waitForLoading();
    fireEvent.click(screen.getByText(/New Course/i).closest("button")!);
    
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Create Course/i })).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Course Name/i), { target: { value: "Error Course" } });
    const submitBtn = screen.getAllByRole("button", { name: /Create Course/i }).find(btn => btn.getAttribute("type") === "submit")!;
    fireEvent.click(submitBtn);

    // Dialog should stay open
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Create Course/i })).toBeInTheDocument();
    });
  });
});
