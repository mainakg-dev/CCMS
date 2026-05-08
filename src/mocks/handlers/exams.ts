import { http, HttpResponse } from "msw";
import { mswUrl } from "../utils";

export const examHandlers = [
  http.post(mswUrl("/exmformfillupDatafetch"), () => {
    return HttpResponse.json({
      studentName: "John Doe",
      courseName: "Diploma in Computer Application",
      activated: true,
      enrollmentNo: "12345",
      status: "Enrollment Verified",
      fatherName: "Richard Doe",
      admissionDate: new Date().toISOString(),
    });
  }),

  http.post(mswUrl("/examFormFillup"), () => {
    return HttpResponse.json({ message: "Exam form submitted successfully" });
  }),

  http.post(mswUrl("/generateadmit"), () => {
    return HttpResponse.json({ message: "Admit card generated successfully" });
  }),

  http.post(mswUrl("/exmmarksentry"), () => {
    return HttpResponse.json({ message: "Marks entered successfully" });
  }),

  http.post(mswUrl("/updateMarksheet"), () => {
    return HttpResponse.json({ message: "Marksheet updated successfully" });
  }),
];
