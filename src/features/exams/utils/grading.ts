import { GRADE_SCALE } from "@/lib/constants";
import type { SubjectMarks, MarksCalculation } from "../types/exam.types";

/**
 * Calculate total marks, percentage, and grade from subject marks.
 *
 * Business Rules:
 * - Total Obtained = Sum of all theoryMarks + Sum of all practicalMarks
 * - Total Full = Sum of all theoryFullMarks + Sum of all practicalFullMarks
 * - Percentage = (Total Obtained / Total Full) * 100 (rounded to 2 decimal places)
 * - Grade follows the scale: >= 90% = AA, >= 80% = A+, >= 70% = A, etc.
 */
export function calculateMarks(subjects: SubjectMarks[]): MarksCalculation {
  const totalObtained = subjects.reduce(
    (sum, s) => sum + s.theoryMarks + s.practicalMarks,
    0
  );

  const totalFull = subjects.reduce(
    (sum, s) => sum + s.theoryFullMarks + s.practicalFullMarks,
    0
  );

  const percentage =
    totalFull > 0
      ? Math.round(((totalObtained / totalFull) * 100 + Number.EPSILON) * 100) / 100
      : 0;

  const grade = getGrade(percentage);

  return { totalObtained, totalFull, percentage, grade };
}

/**
 * Get grade based on percentage.
 *
 * Grading Scale:
 * - >= 90% → AA
 * - >= 80% → A+
 * - >= 70% → A
 * - >= 60% → B+
 * - >= 50% → B
 * - >= 40% → C
 * - < 40%  → D
 */
export function getGrade(percentage: number): string {
  for (const { min, grade } of GRADE_SCALE) {
    if (percentage >= min) return grade;
  }
  return "D";
}
