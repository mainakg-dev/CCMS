import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your CCMS admin or center account.",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <LoginForm />
      <p className="text-sm text-muted-foreground">
        Are you a student?{" "}
        <Link
          href="/student-login"
          className="text-primary hover:underline font-medium"
        >
          Access Student Portal
        </Link>
      </p>
    </div>
  );
}
