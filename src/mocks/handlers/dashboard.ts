import { http, HttpResponse } from "msw";
import { mswUrl } from "../utils";

export const dashboardHandlers = [
  http.get(mswUrl("/dashboardStats"), () => {
    return HttpResponse.json({
      totalEnrollments: 1250,
      activeStudents: 850,
      examsPending: 45,
      totalCourses: 12,
      totalCenters: 8,
      passRate: 92.5,
    });
  }),

  http.get(mswUrl("/recentActivity"), () => {
    return HttpResponse.json([
      {
        id: "act1",
        type: "ENROLLMENT",
        description: "New student enrolled in DCA",
        timestamp: new Date().toISOString(),
      },
      {
        id: "act2",
        type: "EXAM",
        description: "Exam results published for PGDCA",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "act3",
        type: "CENTER",
        description: "New franchise center approved in Delhi",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
      },
    ]);
  }),
];
