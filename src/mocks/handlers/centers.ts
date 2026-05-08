import { http, HttpResponse } from "msw";
import { mswUrl } from "../utils";

export const centerHandlers = [
  http.get(mswUrl("/All_Center"), () => {
    return HttpResponse.json([
      {
        id: "center1",
        name: "Main Campus",
        code: "MC001",
        email: "main@example.com",
        phone: "1234567890",
        address: "123 Main St, City",
      },
      {
        id: "center2",
        name: "North Branch",
        code: "NB002",
        email: "north@example.com",
        phone: "0987654321",
        address: "456 North Ave, City",
      },
    ]);
  }),

  http.get(mswUrl("/FetchAllEnquiry"), () => {
    return HttpResponse.json([
      {
        id: "enq1",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "5551234567",
        address: "789 New St",
      },
    ]);
  }),

  http.delete(mswUrl("/deleteEnquiry"), () => {
    return HttpResponse.json({ message: "Enquiry deleted successfully" });
  }),

  http.post(mswUrl("/generate_franchise"), () => {
    return HttpResponse.json({ message: "Franchise generated successfully" });
  }),

  http.post(mswUrl("/amountEdit"), () => {
    return HttpResponse.json({ message: "Amount updated successfully" });
  }),
];
