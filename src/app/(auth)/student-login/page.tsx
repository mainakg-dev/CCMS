import type { Metadata } from "next";
import { StudentLoginForm } from "@/features/auth/components/student-login-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Student Login",
  description: "Access your student portal to view enrollment and exam details.",
};

export default function StudentLoginPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <StudentLoginForm />
      <p className="text-sm text-muted-foreground">
        Admin or Center?{" "}
        <Link
          href="/login"
          className="text-primary hover:underline font-medium"
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
}
