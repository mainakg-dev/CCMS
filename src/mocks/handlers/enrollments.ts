import { http, HttpResponse } from "msw";
import { mswUrl } from "../utils";

const mockEnrollments = Array.from({ length: 50 }, (_, i) => ({
  id: `e${i + 1}`,
  enrollmentNo: `ENR2024${i.toString().padStart(4, "0")}`,
  name: `Student ${i + 1}`,
  fatherName: "Father Name",
  courseId: "c1",
  courseName: "Diploma in Computer Application",
  mobile: `98765432${i.toString().padStart(2, "0")}`,
  status: "Pending",
  activated: i % 3 !== 0,
  admissionDate: new Date().toISOString(),
}));

export const enrollmentHandlers = [
  http.get(mswUrl("/AllEnrollments"), ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit") || 20);
    const cursor = Number(url.searchParams.get("cursor") || 0);

    const enrollments = mockEnrollments.slice(cursor, cursor + limit);
    const nextCursor = cursor + limit < mockEnrollments.length ? cursor + limit : null;

    return HttpResponse.json({
      enrollments,
      nextCursor,
      totalCount: mockEnrollments.length,
    });
  }),

  http.post(mswUrl("/createEnrollment"), async () => {
    return HttpResponse.json({ message: "Enrollment created successfully", id: "new123" });
  }),

  http.put(mswUrl("/updateEnrollment"), async () => {
    return HttpResponse.json({ message: "Enrollment updated successfully" });
  }),

  http.delete(mswUrl("/Delete_Enrollment"), async () => {
    return HttpResponse.json({ message: "Enrollment deleted successfully" });
  }),

  http.post(mswUrl("/ActivateEnrollment"), async () => {
    return HttpResponse.json({ message: "Enrollment activated" });
  }),

  http.post(mswUrl("/deActivateEnrollment"), async () => {
    return HttpResponse.json({ message: "Enrollment deactivated" });
  }),

  http.post(mswUrl("/generateId"), async () => {
    return HttpResponse.json({ message: "ID Card generated" });
  }),

  http.get(mswUrl("/generate-presigned-url"), () => {
    return HttpResponse.json({
      url: "https://mock-s3-bucket.s3.amazonaws.com/upload-url?signature=mock",
    });
  }),
];
