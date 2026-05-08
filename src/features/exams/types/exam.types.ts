export interface ExamFormFillupData {
  enrollmentNo: string;
  studentName: string;
  courseName: string;
  activated: boolean;
}

export interface ExamFormFillupRequest {
  enrollmentNo: string;
  atiCode: string;
  centerCode: string;
  lastPaymentReceiptNo: string;
}

export interface SubjectMarks {
  subjectId: string;
  subjectName: string;
  theoryMarks: number;
  theoryFullMarks: number;
  practicalMarks: number;
  practicalFullMarks: number;
}

export interface MarksEntryRequest {
  enrollmentNo: string;
  passingYear: string;
  dateOfPublishing: string;
  remark: "PASS" | "FAIL";
  subjects: SubjectMarks[];
}

export interface UpdateMarksheetRequest {
  enrollmentNo: string;
  passingYear: string;
  dateOfPublishing: string;
  remark: "PASS" | "FAIL";
  subjects: SubjectMarks[];
}

export interface AdmitCardRequest {
  enrollmentNo: string;
}

export interface MarksCalculation {
  totalObtained: number;
  totalFull: number;
  percentage: number;
  grade: string;
}
