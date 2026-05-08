"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudentLogin } from "@/features/auth/api/use-auth";
import { studentLoginSchema, type StudentLoginFormValues } from "../schemas/auth.schema";

export function StudentLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useStudentLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentLoginFormValues>({
    resolver: zodResolver(studentLoginSchema),
    defaultValues: { enrollmentNo: "", password: "" },
  });

  const onSubmit = (data: StudentLoginFormValues) => {
    login(data);
  };

  return (
    <Card className="w-full max-w-md glass-card border-0 animate-scale-in">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
          <GraduationCap className="h-7 w-7 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Student Portal</CardTitle>
        <CardDescription>
          Access your enrollment and exam information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="student-enrollment">Enrollment Number</Label>
            <Input
              id="student-enrollment"
              placeholder="Enter your enrollment number"
              {...register("enrollmentNo")}
              className="h-11"
            />
            {errors.enrollmentNo && (
              <p className="text-xs text-destructive">{errors.enrollmentNo.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="student-password">Password</Label>
            <div className="relative">
              <Input
                id="student-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register("password")}
                className="h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 font-semibold"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Access Portal
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
