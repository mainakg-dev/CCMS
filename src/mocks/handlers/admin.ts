import { http, HttpResponse } from "msw";
import { mswUrl } from "../utils";

export const adminHandlers = [
  http.get(mswUrl("/Fetch_Coordinator"), () => {
    return HttpResponse.json([
      {
        id: "coord1",
        name: "Admin User",
        email: "admin@example.com",
        phone: "1112223333",
        role: "ADMIN",
      },
    ]);
  }),

  http.post(mswUrl("/Coordinator_Update"), () => {
    return HttpResponse.json({ message: "Coordinator updated successfully" });
  }),

  http.delete(mswUrl("/Delete_Admin"), () => {
    return HttpResponse.json({ message: "Admin deleted successfully" });
  }),

  http.post(mswUrl("/noticecreate"), () => {
    return HttpResponse.json({ message: "Notice created successfully" });
  }),

  http.get(mswUrl("/fetchAllNotices"), () => {
    return HttpResponse.json([
      {
        id: "notice1",
        title: "Important System Update",
        content: "The system will be down for maintenance this weekend.",
        createdAt: new Date().toISOString(),
        author: "Admin",
      },
      {
        id: "notice2",
        title: "Exam Schedule Released",
        content: "The final exam schedule for DCA and PGDCA has been released.",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        author: "Admin",
      },
    ]);
  }),
];
