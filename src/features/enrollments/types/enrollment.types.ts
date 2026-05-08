import { EnrollmentStatus } from "@/lib/constants";

export interface Enrollment {
  id: string;
  enrollmentNo: string;
  name: string;
  fatherName: string;
  motherName: string;
  address: string;
  dob: string;
  educationalQualification: string;
  category: string;
  courseId: string;
  courseName?: string;
  idType: string;
  idProofNo: string;
  nationality: string;
  sex: string;
  mobile: string;
  email: string;
  pincode: string;
  state: string;
  district: string;
  ps: string;
  po: string;
  vill: string;
  admissionDate: string;
  imageUrl?: string;
  status: EnrollmentStatus;
  activated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEnrollmentRequest {
  name: string;
  fatherName: string;
  motherName: string;
  address: string;
  dob: string;
  educationalQualification: string;
  category: string;
  courseId: string;
  idType: string;
  idProofNo: string;
  nationality: string;
  sex: string;
  mobile: string;
  email: string;
  pincode: string;
  state: string;
  district: string;
  ps: string;
  po: string;
  vill: string;
  admissionDate: string;
  imageUrl: string;
}

export interface UpdateEnrollmentRequest extends Partial<CreateEnrollmentRequest> {
  id: string;
}

export interface EnrollmentListResponse {
  enrollments: Enrollment[];
  nextCursor?: string;
  total?: number;
}

export interface PresignedUrlResponse {
  url: string;
  key: string;
}
