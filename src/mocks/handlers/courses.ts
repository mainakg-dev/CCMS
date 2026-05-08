import { http, HttpResponse } from "msw";
import { mswUrl } from "../utils";

export const courseHandlers = [
  http.get(mswUrl("/fetchAllCourseWithSub"), () => {
    return HttpResponse.json([
      {
        id: "c1",
        name: "Diploma in Computer Application",
        duration: "6 Months",
        description: "Basic computer course",
        subjects: [
          { id: "s1", name: "Computer Fundamentals", theoryFullMarks: 100, practicalFullMarks: 0 },
          { id: "s2", name: "Operating System", theoryFullMarks: 50, practicalFullMarks: 50 },
        ],
      },
      {
        id: "c2",
        name: "Advanced Excel",
        duration: "3 Months",
        description: "Advanced spreadsheet skills",
        subjects: [
          { id: "s3", name: "Excel Basics to Advanced", theoryFullMarks: 40, practicalFullMarks: 60 },
        ],
      },
    ]);
  }),

  http.post(mswUrl("/createCourse"), () => {
    return HttpResponse.json({ message: "Course created successfully" });
  }),

  http.put(mswUrl("/updateCourse"), () => {
    return HttpResponse.json({ message: "Course updated successfully" });
  }),

  http.post(mswUrl("/subjectAdd"), () => {
    return HttpResponse.json({ message: "Subject added successfully" });
  }),
];
