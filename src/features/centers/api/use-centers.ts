"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import type {
  Center,
  Enquiry,
  AmountEditRequest,
} from "../types/center.types";

const CENTERS_KEY = ["centers"];
const ENQUIRIES_KEY = ["enquiries"];

// ─── Fetch All Centers ───
export function useCenters() {
  return useQuery<Center[]>({
    queryKey: CENTERS_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/All_Center");
      return res.data;
    },
  });
}

// ─── Fetch All Enquiries ───
export function useEnquiries() {
  return useQuery<Enquiry[]>({
    queryKey: ENQUIRIES_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/FetchAllEnquiry");
      return res.data;
    },
  });
}

// ─── Delete Enquiry ───
export function useDeleteEnquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.delete("/deleteEnquiry", { data: { id } });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ENQUIRIES_KEY });
      toast.success("Enquiry deleted");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete enquiry", { description: error.message });
    },
  });
}

// ─── Generate Franchise ───
export function useGenerateFranchise() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (enquiryId: string) => {
      const res = await apiClient.post("/generate_franchise", { enquiryId });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ENQUIRIES_KEY });
      queryClient.invalidateQueries({ queryKey: CENTERS_KEY });
      toast.success("Franchise generated successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to generate franchise", {
        description: error.message,
      });
    },
  });
}

// ─── Edit Amount ───
export function useAmountEdit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AmountEditRequest) => {
      const res = await apiClient.post("/amountEdit", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CENTERS_KEY });
      toast.success("Amount updated");
    },
    onError: (error: Error) => {
      toast.error("Failed to update amount", { description: error.message });
    },
  });
}
