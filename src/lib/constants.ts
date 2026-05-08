export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export enum UserRole {
  ADMIN = "ADMIN",
  CENTER = "CENTER",
  STUDENT = "STUDENT",
}

export enum EnrollmentStatus {
  PENDING = "Pending",
  ENROLLMENT_DONE = "Enrollment Done",
  ENROLLMENT_VERIFIED = "Enrollment Verified",
  EXAM_FORM_VERIFIED = "Exam Form Verified",
  MARKSHEET_VERIFIED = "Marksheet Verified",
  MARKSHEET_APPROVED = "Marksheet Approved",
  PASS_OUT = "PassOut",
}

export const ENROLLMENT_STATUS_ORDER: EnrollmentStatus[] = [
  EnrollmentStatus.PENDING,
  EnrollmentStatus.ENROLLMENT_DONE,
  EnrollmentStatus.ENROLLMENT_VERIFIED,
  EnrollmentStatus.EXAM_FORM_VERIFIED,
  EnrollmentStatus.MARKSHEET_VERIFIED,
  EnrollmentStatus.MARKSHEET_APPROVED,
  EnrollmentStatus.PASS_OUT,
];

export const GRADE_SCALE = [
  { min: 90, grade: "AA" },
  { min: 80, grade: "A+" },
  { min: 70, grade: "A" },
  { min: 60, grade: "B+" },
  { min: 50, grade: "B" },
  { min: 40, grade: "C" },
  { min: 0, grade: "D" },
] as const;

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
] as const;

export const CATEGORIES = [
  "General", "OBC", "SC", "ST", "EWS",
] as const;

export const QUALIFICATIONS = [
  "Below 10th", "10th Pass", "12th Pass", "Graduate", "Post Graduate", "Other",
] as const;

export const SEXES = ["Male", "Female", "Other"] as const;

export const NATIONALITIES = ["Indian", "Other"] as const;

export const ID_TYPES = [
  "Aadhaar Card", "PAN Card", "Voter ID", "Passport", "Driving License",
] as const;

export const EXAM_REMARKS = ["PASS", "FAIL"] as const;

export const NAV_ITEMS = {
  ADMIN: [
    { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { title: "Enrollments", href: "/enrollments", icon: "Users" },
    { title: "Exams", href: "/exams", icon: "FileCheck" },
    { title: "Courses", href: "/courses", icon: "BookOpen" },
    { title: "Centers", href: "/centers", icon: "Building2" },
    { title: "Enquiries", href: "/enquiries", icon: "MessageSquare" },
    { title: "Coordinators", href: "/coordinators", icon: "UserCog" },
    { title: "Notices", href: "/notices", icon: "Bell" },
    { title: "Settings", href: "/settings", icon: "Settings" },
  ],
  CENTER: [
    { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { title: "Enrollments", href: "/enrollments", icon: "Users" },
    { title: "Exams", href: "/exams", icon: "FileCheck" },
    { title: "Courses", href: "/courses", icon: "BookOpen" },
    { title: "Notices", href: "/notices", icon: "Bell" },
    { title: "Settings", href: "/settings", icon: "Settings" },
  ],
  STUDENT: [
    { title: "My Portal", href: "/student-portal", icon: "GraduationCap" },
    { title: "Settings", href: "/settings", icon: "Settings" },
  ],
} as const;
