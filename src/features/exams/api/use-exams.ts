"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import type {
  ExamFormFillupRequest,
  ExamFormFillupData,
  MarksEntryRequest,
  UpdateMarksheetRequest,
  AdmitCardRequest,
} from "../types/exam.types";

const EXAMS_KEY = ["exams"];

// ─── Fetch Student Data for Exam Form ───
export function useExamFormDataFetch() {
  return useMutation({
    mutationFn: async (enrollmentNo: string) => {
      const res = await apiClient.post<ExamFormFillupData>(
        "/exmformfillupDatafetch",
        { enrollmentNo }
      );
      return res.data;
    },
    onError: (error: Error) => {
      toast.error("Failed to fetch student data", {
        description: error.message,
      });
    },
  });
}

// ─── Submit Exam Form ───
export function useExamFormFillup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ExamFormFillupRequest) => {
      const res = await apiClient.post("/examFormFillup", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXAMS_KEY });
      toast.success("Exam form submitted successfully");
    },
    onError: (error: Error) => {
      // Handle known backend errors
      if (error.message.includes("P2002")) {
        toast.error("Duplicate exam form", {
          description: "An exam form already exists for this enrollment.",
        });
      } else if (error.message.includes("P2025")) {
        toast.error("Payment incomplete", {
          description: "Please complete the payment before submitting.",
        });
      } else {
        toast.error("Failed to submit exam form", {
          description: error.message,
        });
      }
    },
  });
}

// ─── Generate Admit Card ───
export function useGenerateAdmitCard() {
  return useMutation({
    mutationFn: async (data: AdmitCardRequest) => {
      const res = await apiClient.post("/generateadmit", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Admit card generated");
    },
    onError: (error: Error) => {
      toast.error("Failed to generate admit card", {
        description: error.message,
      });
    },
  });
}

// ─── Marks Entry ───
export function useMarksEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MarksEntryRequest) => {
      const res = await apiClient.post("/exmmarksentry", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXAMS_KEY });
      toast.success("Marks entered successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to enter marks", { description: error.message });
    },
  });
}

// ─── Update Marksheet ───
export function useUpdateMarksheet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateMarksheetRequest) => {
      const res = await apiClient.post("/updateMarksheet", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXAMS_KEY });
      toast.success("Marksheet updated successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to update marksheet", {
        description: error.message,
      });
    },
  });
}
