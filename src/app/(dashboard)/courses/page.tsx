"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { useCourses, useCreateCourse, useAddSubject } from "@/features/courses/api/use-courses";
import { courseSchema, subjectSchema, type CourseFormValues, type SubjectFormValues } from "@/features/courses/schemas/course.schema";
import { Badge } from "@/components/ui/badge";

export default function CoursesPage() {
  const { data: courses, isLoading } = useCourses();
  const { mutate: createCourse, isPending: isCreating } = useCreateCourse();
  const { mutate: addSubject, isPending: isAddingSubject } = useAddSubject();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [subjectDialogCourseId, setSubjectDialogCourseId] = useState<string | null>(null);

  const courseForm = useForm<CourseFormValues>({ resolver: zodResolver(courseSchema) });
  const subjectForm = useForm<SubjectFormValues>({ resolver: zodResolver(subjectSchema) });

  const toggleExpand = (id: string) => {
    const next = new Set(expanded);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpanded(next);
  };

  if (isLoading) return <div className="space-y-6"><PageHeader title="Courses" /><LoadingSkeleton variant="card" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Courses" description="Manage courses and their subjects">
        <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
          <DialogTrigger render={<Button><Plus className="h-4 w-4 mr-2" />New Course</Button>} />
          <DialogContent>
            <DialogHeader><DialogTitle>Create Course</DialogTitle></DialogHeader>
            <form onSubmit={courseForm.handleSubmit((data) => createCourse(data, { onSuccess: () => { setCourseDialogOpen(false); courseForm.reset(); } }))} className="space-y-4">
              <div className="space-y-2"><Label>Course Name</Label><Input {...courseForm.register("name")} />{courseForm.formState.errors.name && <p className="text-xs text-destructive">{courseForm.formState.errors.name.message}</p>}</div>
              <div className="space-y-2"><Label>Duration</Label><Input {...courseForm.register("duration")} placeholder="e.g., 6 months" /></div>
              <div className="space-y-2"><Label>Description</Label><Input {...courseForm.register("description")} /></div>
              <Button type="submit" className="w-full" disabled={isCreating}>{isCreating ? "Creating..." : "Create Course"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {!courses?.length ? (
        <EmptyState title="No courses yet" description="Create your first course to get started." actionLabel="Create Course" onAction={() => setCourseDialogOpen(true)} />
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id} className="transition-all hover:shadow-md">
              <CardHeader className="cursor-pointer" onClick={() => toggleExpand(course.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {expanded.has(course.id) ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-base">{course.name}</CardTitle>
                      {course.duration && <p className="text-xs text-muted-foreground mt-0.5">{course.duration}</p>}
                    </div>
                  </div>
                  <Badge variant="secondary">{course.subjects?.length || 0} subjects</Badge>
                </div>
              </CardHeader>
              {expanded.has(course.id) && (
                <CardContent className="animate-slide-down">
                  {course.subjects?.length ? (
                    <Table>
                      <TableHeader><TableRow><TableHead>Subject</TableHead><TableHead className="text-center">Theory Full Marks</TableHead><TableHead className="text-center">Practical Full Marks</TableHead></TableRow></TableHeader>
                      <TableBody>{course.subjects.map((sub) => (
                        <TableRow key={sub.id}><TableCell>{sub.name}</TableCell><TableCell className="text-center">{sub.theoryFullMarks}</TableCell><TableCell className="text-center">{sub.practicalFullMarks}</TableCell></TableRow>
                      ))}</TableBody>
                    </Table>
                  ) : <p className="text-sm text-muted-foreground">No subjects added yet.</p>}
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => { setSubjectDialogCourseId(course.id); subjectForm.setValue("courseId", course.id); }}>
                    <Plus className="h-3 w-3 mr-1" />Add Subject
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Add Subject Dialog */}
      <Dialog open={!!subjectDialogCourseId} onOpenChange={() => setSubjectDialogCourseId(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Subject</DialogTitle></DialogHeader>
          <form onSubmit={subjectForm.handleSubmit((data) => addSubject(data, { onSuccess: () => { setSubjectDialogCourseId(null); subjectForm.reset(); } }))} className="space-y-4">
            <div className="space-y-2"><Label>Subject Name</Label><Input {...subjectForm.register("name")} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Theory Full Marks</Label><Input type="number" {...subjectForm.register("theoryFullMarks", { valueAsNumber: true })} /></div>
              <div className="space-y-2"><Label>Practical Full Marks</Label><Input type="number" {...subjectForm.register("practicalFullMarks", { valueAsNumber: true })} /></div>
            </div>
            <Button type="submit" className="w-full" disabled={isAddingSubject}>{isAddingSubject ? "Adding..." : "Add Subject"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
