"use client";

import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import type {
  CreateEnrollmentRequest,
  UpdateEnrollmentRequest,
  EnrollmentListResponse,
  PresignedUrlResponse,
} from "../types/enrollment.types";

const ENROLLMENTS_KEY = ["enrollments"];

// ─── List Enrollments (Infinite Scroll) ───
export function useEnrollments(limit = 20) {
  return useInfiniteQuery<EnrollmentListResponse>({
    queryKey: [...ENROLLMENTS_KEY, { limit }],
    queryFn: async ({ pageParam }) => {
      const params: Record<string, string | number> = { limit };
      if (pageParam) params.cursor = pageParam as string;
      const res = await apiClient.get("/AllEnrollments", { params });
      return res.data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

// ─── Create Enrollment ───
export function useCreateEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateEnrollmentRequest) => {
      const res = await apiClient.post("/createEnrollment", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ENROLLMENTS_KEY });
      toast.success("Enrollment created successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to create enrollment", {
        description: error.message,
      });
    },
  });
}

// ─── Update Enrollment ───
export function useUpdateEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateEnrollmentRequest) => {
      const res = await apiClient.put("/updateEnrollment", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ENROLLMENTS_KEY });
      toast.success("Enrollment updated successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to update enrollment", {
        description: error.message,
      });
    },
  });
}

// ─── Delete Enrollment ───
export function useDeleteEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.delete("/Delete_Enrollment", {
        data: { id },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ENROLLMENTS_KEY });
      toast.success("Enrollment deleted");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete enrollment", {
        description: error.message,
      });
    },
  });
}

// ─── Activate / Deactivate ───
export function useActivateEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.post("/ActivateEnrollment", { id });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ENROLLMENTS_KEY });
      toast.success("Enrollment activated");
    },
    onError: (error: Error) => {
      toast.error("Activation failed", { description: error.message });
    },
  });
}

export function useDeactivateEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.post("/deActivateEnrollment", { id });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ENROLLMENTS_KEY });
      toast.success("Enrollment deactivated");
    },
    onError: (error: Error) => {
      toast.error("Deactivation failed", { description: error.message });
    },
  });
}

// ─── Generate ID Card ───
export function useGenerateIdCard() {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.post("/generateId", { id });
      return res.data;
    },
    onSuccess: () => {
      toast.success("ID card generated successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to generate ID card", {
        description: error.message,
      });
    },
  });
}

// ─── Presigned URL for Image Upload ───
export function usePresignedUrl() {
  return useMutation({
    mutationFn: async ({
      fileName,
      fileType,
      category = "face",
    }: {
      fileName: string;
      fileType: string;
      category?: string;
    }) => {
      const res = await apiClient.get<PresignedUrlResponse>(
        "/generate-presigned-url",
        { params: { fileName, fileType, category } }
      );
      return res.data;
    },
  });
}

// ─── Upload Image to Presigned URL ───
export function useUploadImage() {
  return useMutation({
    mutationFn: async ({
      presignedUrl,
      file,
    }: {
      presignedUrl: string;
      file: File;
    }) => {
      await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });
      // Return the URL without query params (the object URL)
      return presignedUrl.split("?")[0];
    },
  });
}
