import { authHandlers } from "./auth";
import { enrollmentHandlers } from "./enrollments";
import { examHandlers } from "./exams";
import { courseHandlers } from "./courses";
import { centerHandlers } from "./centers";
import { adminHandlers } from "./admin";
import { studentHandlers } from "./student";
import { dashboardHandlers } from "./dashboard";

export const handlers = [
  ...authHandlers,
  ...enrollmentHandlers,
  ...examHandlers,
  ...courseHandlers,
  ...centerHandlers,
  ...adminHandlers,
  ...studentHandlers,
  ...dashboardHandlers,
];
