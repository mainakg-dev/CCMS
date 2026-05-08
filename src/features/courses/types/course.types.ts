export interface Subject {
  id: string;
  name: string;
  theoryFullMarks: number;
  practicalFullMarks: number;
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  description?: string;
  subjects: Subject[];
  createdAt: string;
}

export interface CreateCourseRequest {
  name: string;
  duration: string;
  description?: string;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {
  id: string;
}

export interface AddSubjectRequest {
  courseId: string;
  name: string;
  theoryFullMarks: number;
  practicalFullMarks: number;
}
