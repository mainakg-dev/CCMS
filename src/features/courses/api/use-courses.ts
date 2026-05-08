"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import type {
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
  AddSubjectRequest,
} from "../types/course.types";

const COURSES_KEY = ["courses"];

// ─── Fetch All Courses with Subjects ───
export function useCourses() {
  return useQuery<Course[]>({
    queryKey: COURSES_KEY,
    queryFn: async () => {
      const res = await apiClient.get("/fetchAllCourseWithSub");
      return res.data;
    },
  });
}

// ─── Create Course ───
export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCourseRequest) => {
      const res = await apiClient.post("/createCourse", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSES_KEY });
      toast.success("Course created successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to create course", { description: error.message });
    },
  });
}

// ─── Update Course ───
export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCourseRequest) => {
      const res = await apiClient.put("/updateCourse", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSES_KEY });
      toast.success("Course updated");
    },
    onError: (error: Error) => {
      toast.error("Failed to update course", { description: error.message });
    },
  });
}

// ─── Add Subject ───
export function useAddSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddSubjectRequest) => {
      const res = await apiClient.post("/subjectAdd", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSES_KEY });
      toast.success("Subject added");
    },
    onError: (error: Error) => {
      toast.error("Failed to add subject", { description: error.message });
    },
  });
}
