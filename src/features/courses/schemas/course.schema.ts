import { z } from "zod";

export const courseSchema = z.object({
  name: z.string().min(1, "Course name is required").max(200),
  duration: z.string().min(1, "Course duration is required"),
  description: z.string().optional(),
});

export const subjectSchema = z.object({
  courseId: z.string().min(1, "Course is required"),
  name: z.string().min(1, "Subject name is required").max(200),
  theoryFullMarks: z.number().min(0, "Must be 0 or more"),
  practicalFullMarks: z.number().min(0, "Must be 0 or more"),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
export type SubjectFormValues = z.infer<typeof subjectSchema>;
