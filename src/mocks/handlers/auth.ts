import { http, HttpResponse } from "msw";
import { mswUrl } from "../utils";

export const authHandlers = [
  http.post(mswUrl("/loginRoute"), async ({ request }) => {
    const { username, password } = (await request.json()) as any;
    if (username === "admin" && password === "password") {
      return HttpResponse.json({
        user: {
          id: "1",
          username: "admin",
          name: "Admin User",
          role: "ADMIN",
        },
      });
    }
    return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }),

  http.post(mswUrl("/studentLogin"), async ({ request }) => {
    const { enrollmentNo, password } = (await request.json()) as any;
    if (enrollmentNo === "12345" && password === "password") {
      return HttpResponse.json({
        user: {
          id: "student1",
          username: "12345",
          name: "John Doe",
          role: "STUDENT",
        },
      });
    }
    return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }),

  http.get(mswUrl("/logout"), () => {
    return HttpResponse.json({ message: "Logged out successfully" });
  }),

  http.post(mswUrl("/ChangePassword"), () => {
    return HttpResponse.json({ message: "Password updated successfully" });
  }),

  http.post(mswUrl("/otpInput"), () => {
    return HttpResponse.json({ message: "OTP sent" });
  }),

  http.get(mswUrl("/generateSecret"), () => {
    return HttpResponse.json({ secret: "MOCK_SECRET_KEY" });
  }),

  http.post(mswUrl("/otpVerify"), () => {
    return HttpResponse.json({ message: "OTP verified" });
  }),

  http.post(mswUrl("/disable2fa"), () => {
    return HttpResponse.json({ message: "2FA disabled" });
  }),
];
