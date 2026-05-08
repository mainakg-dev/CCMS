import { http, HttpResponse } from "msw";
import { mswUrl } from "../utils";

export const studentHandlers = [
  http.get(mswUrl("/studentData"), () => {
    return HttpResponse.json({
      name: "John Doe",
      enrollmentNo: "12345",
      fatherName: "Richard Doe",
      courseName: "Diploma in Computer Application",
      admissionDate: new Date().toISOString(),
      status: "Marksheet Approved",
      activated: true,
      examFormSubmitted: true,
      marksheet: {
        percentage: 85,
        grade: "A+",
        remark: "PASS",
      },
    });
  }),
];
