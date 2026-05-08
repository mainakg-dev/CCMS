"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";

export interface StudentPortalData {
  enrollmentNo: string;
  name: string;
  fatherName: string;
  courseName: string;
  status: string;
  activated: boolean;
  imageUrl?: string;
  admissionDate: string;
  examFormSubmitted: boolean;
  marksheet?: {
    percentage: number;
    grade: string;
    remark: string;
    passingYear: string;
  };
}

export function useStudentData() {
  return useQuery<StudentPortalData>({
    queryKey: ["student-data"],
    queryFn: async () => {
      const res = await apiClient.get("/studentData");
      return res.data;
    },
  });
}
