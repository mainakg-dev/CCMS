import { z } from "zod";
import {
  CATEGORIES,
  QUALIFICATIONS,
  SEXES,
  NATIONALITIES,
  ID_TYPES,
  INDIAN_STATES,
} from "@/lib/constants";

export const enrollmentSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  fatherName: z.string().min(1, "Father's name is required").max(100),
  motherName: z.string().min(1, "Mother's name is required").max(100),
  address: z.string().min(1, "Address is required").max(500),
  dob: z.string().min(1, "Date of birth is required"),
  educationalQualification: z.enum(QUALIFICATIONS, {
    error: "Please select a qualification",
  }),
  category: z.enum(CATEGORIES, {
    error: "Please select a category",
  }),
  courseId: z.string().min(1, "Please select a course"),
  idType: z.enum(ID_TYPES, {
    error: "Please select an ID type",
  }),
  idProofNo: z.string().min(1, "ID proof number is required"),
  nationality: z.enum(NATIONALITIES, {
    error: "Please select nationality",
  }),
  sex: z.enum(SEXES, {
    error: "Please select sex",
  }),
  mobile: z
    .string()
    .length(10, "Mobile number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Mobile number must contain only digits"),
  email: z.string().email("Please enter a valid email address"),
  pincode: z
    .string()
    .length(6, "Pincode must be exactly 6 digits")
    .regex(/^\d{6}$/, "Pincode must contain only digits"),
  state: z.enum(INDIAN_STATES, {
    error: "Please select a state",
  }),
  district: z.string().min(1, "District is required"),
  ps: z.string().min(1, "Police Station is required"),
  po: z.string().min(1, "Post Office is required"),
  vill: z.string().min(1, "Village is required"),
  admissionDate: z.string().min(1, "Admission date is required"),
  imageUrl: z.string().min(1, "Applicant photo is required"),
});

export type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;
