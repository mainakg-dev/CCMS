"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import type {
  Coordinator,
  CoordinatorUpdateRequest,
  CreateNoticeRequest,
} from "../types/admin.types";

const COORDINATORS_KEY = ["coordinators"];
const NOTICES_KEY = ["notices"];

// ─── Fetch Coordinators ───
export function useCoordinators() {
  return useQuery<Coordinator[]>({
    queryKey: COORDINATORS_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/Fetch_Coordinator");
      return res.data;
    },
  });
}

// ─── Update Coordinator ───
export function useUpdateCoordinator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CoordinatorUpdateRequest) => {
      const res = await apiClient.post("/Coordinator_Update", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COORDINATORS_KEY });
      toast.success("Coordinator updated");
    },
    onError: (error: Error) => {
      toast.error("Failed to update coordinator", {
        description: error.message,
      });
    },
  });
}

// ─── Delete Admin ───
export function useDeleteAdmin() {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.delete("/Delete_Admin", { data: { id } });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Admin deleted");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete admin", { description: error.message });
    },
  });
}

// ─── Create Notice ───
export function useCreateNotice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateNoticeRequest) => {
      const res = await apiClient.post("/noticecreate", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTICES_KEY });
      toast.success("Notice created");
    },
    onError: (error: Error) => {
      toast.error("Failed to create notice", { description: error.message });
    },
  });
}
