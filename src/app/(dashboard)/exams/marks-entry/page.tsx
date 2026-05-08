"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/shared/page-header";
import { marksEntrySchema, type MarksEntryFormValues } from "@/features/exams/schemas/exam.schema";
import { useMarksEntry, useExamFormDataFetch } from "@/features/exams/api/use-exams";
import { useCourses } from "@/features/courses/api/use-courses";
import { calculateMarks } from "@/features/exams/utils/grading";
import { EXAM_REMARKS } from "@/lib/constants";

export default function MarksEntryPage() {
  const { mutate: submitMarks, isPending } = useMarksEntry();
  const { mutate: fetchStudent } = useExamFormDataFetch();
  const { data: courses } = useCourses();
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [loaded, setLoaded] = useState(false);

  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<MarksEntryFormValues>({
    resolver: zodResolver(marksEntrySchema),
    defaultValues: { subjects: [] },
  });

  const { fields } = useFieldArray({ control, name: "subjects" });
  const subjects = watch("subjects");
  const calc = subjects?.length ? calculateMarks(subjects.map((s) => ({
    ...s, theoryMarks: Number(s.theoryMarks) || 0, practicalMarks: Number(s.practicalMarks) || 0,
    theoryFullMarks: Number(s.theoryFullMarks) || 0, practicalFullMarks: Number(s.practicalFullMarks) || 0,
  }))) : null;

  const handleLoadStudent = () => {
    if (!enrollmentNo) return;
    fetchStudent(enrollmentNo, {
      onSuccess: (data) => {
        setValue("enrollmentNo", enrollmentNo);
        const course = courses?.find((c) => c.name === data.courseName);
        if (course?.subjects) {
          setValue("subjects", course.subjects.map((s) => ({
            subjectId: s.id, subjectName: s.name,
            theoryMarks: 0, theoryFullMarks: s.theoryFullMarks,
            practicalMarks: 0, practicalFullMarks: s.practicalFullMarks,
          })));
        }
        setLoaded(true);
      },
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title="Marks Entry" description="Enter subject-wise marks for students" />

      <Card>
        <CardHeader><CardTitle>Load Student</CardTitle></CardHeader>
        <CardContent className="flex gap-2 max-w-md">
          <Input placeholder="Enrollment Number" value={enrollmentNo} onChange={(e) => setEnrollmentNo(e.target.value)} />
          <Button onClick={handleLoadStudent}><Search className="h-4 w-4 mr-2" />Load</Button>
        </CardContent>
      </Card>

      {loaded && (
        <form onSubmit={handleSubmit((data) => submitMarks(data))}>
          <Card className="animate-slide-up">
            <CardHeader><CardTitle>Enter Marks</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2"><Label>Passing Year *</Label><Input {...register("passingYear")} placeholder="2025" />{errors.passingYear && <p className="text-xs text-destructive">{errors.passingYear.message}</p>}</div>
                <div className="space-y-2"><Label>Date of Publishing *</Label><Input type="date" {...register("dateOfPublishing")} /></div>
                <div className="space-y-2"><Label>Remark *</Label><Select onValueChange={(v) => setValue("remark", v as "PASS" | "FAIL")}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{EXAM_REMARKS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select></div>
              </div>

              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader><TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Theory (Full)</TableHead>
                    <TableHead className="text-center">Theory Marks</TableHead>
                    <TableHead className="text-center">Practical (Full)</TableHead>
                    <TableHead className="text-center">Practical Marks</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {fields.map((field, idx) => (
                      <TableRow key={field.id}>
                        <TableCell className="font-medium">{field.subjectName}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{field.theoryFullMarks}</TableCell>
                        <TableCell><Input type="number" className="w-20 mx-auto text-center" {...register(`subjects.${idx}.theoryMarks`)} /></TableCell>
                        <TableCell className="text-center text-muted-foreground">{field.practicalFullMarks}</TableCell>
                        <TableCell><Input type="number" className="w-20 mx-auto text-center" {...register(`subjects.${idx}.practicalMarks`)} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {calc && (
                <div className="flex items-center gap-6 p-4 rounded-xl bg-muted/30 border">
                  <Calculator className="h-5 w-5 text-primary" />
                  <div className="flex gap-6 text-sm">
                    <span>Total: <strong>{calc.totalObtained}/{calc.totalFull}</strong></span>
                    <span>Percentage: <strong>{calc.percentage}%</strong></span>
                    <span>Grade: <strong className="text-primary">{calc.grade}</strong></span>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isPending}>{isPending ? "Submitting..." : "Submit Marks"}</Button>
            </CardContent>
          </Card>
        </form>
      )}
    </div>
  );
}
