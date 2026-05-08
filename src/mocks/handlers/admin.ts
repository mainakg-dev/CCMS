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
];
