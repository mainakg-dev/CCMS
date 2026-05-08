"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { courseSchema, type CourseFormValues } from "@/features/courses/schemas/course.schema";
import { useCreateCourse } from "@/features/courses/api/use-courses";

export default function NewCoursePage() {
  const router = useRouter();
  const { mutate: create, isPending } = useCreateCourse();
  const { register, handleSubmit, formState: { errors } } = useForm<CourseFormValues>({ resolver: zodResolver(courseSchema) });

  return (
    <div className="space-y-6 max-w-xl">
      <PageHeader title="New Course" description="Create a new course">
        <Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Course Details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((data) => create(data, { onSuccess: () => router.push("/courses") }))} className="space-y-4">
            <div className="space-y-2"><Label>Course Name *</Label><Input {...register("name")} />{errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}</div>
            <div className="space-y-2"><Label>Duration *</Label><Input {...register("duration")} placeholder="e.g., 6 months" />{errors.duration && <p className="text-xs text-destructive">{errors.duration.message}</p>}</div>
            <div className="space-y-2"><Label>Description</Label><Input {...register("description")} /></div>
            <Button type="submit" className="w-full" disabled={isPending}>{isPending ? "Creating..." : "Create Course"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
