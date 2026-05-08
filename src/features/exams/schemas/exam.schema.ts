import { z } from "zod";
import { EXAM_REMARKS } from "@/lib/constants";

export const examFormFillupSchema = z.object({
  enrollmentNo: z.string().min(1, "Enrollment number is required"),
  atiCode: z.string().min(1, "ATI code is required"),
  centerCode: z.string().min(1, "Center code is required"),
  lastPaymentReceiptNo: z.string().min(1, "Payment receipt number is required"),
});

const subjectMarksSchema = z.object({
  subjectId: z.string(),
  subjectName: z.string(),
  theoryMarks: z.number().min(0, "Theory marks cannot be negative"),
  theoryFullMarks: z.number(),
  practicalMarks: z.number().min(0, "Practical marks cannot be negative"),
  practicalFullMarks: z.number(),
});

export const marksEntrySchema = z.object({
  enrollmentNo: z.string().min(1, "Enrollment number is required"),
  passingYear: z.string().min(4, "Enter a valid year"),
  dateOfPublishing: z.string().min(1, "Date of publishing is required"),
  remark: z.enum(EXAM_REMARKS, {
    error: "Please select PASS or FAIL",
  }),
  subjects: z.array(subjectMarksSchema).min(1, "At least one subject is required"),
});

export type ExamFormFillupFormValues = z.infer<typeof examFormFillupSchema>;
export type MarksEntryFormValues = z.infer<typeof marksEntrySchema>;
