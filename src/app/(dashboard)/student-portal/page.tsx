"use client";

import { GraduationCap, Calendar, BookOpen, Award, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import { useStudentData } from "@/features/student-portal/api/use-student";

export default function StudentPortalPage() {
  const { data: student, isLoading } = useStudentData();

  if (isLoading) return <div className="space-y-6"><PageHeader title="Student Portal" /><LoadingSkeleton variant="detail" /></div>;
  if (!student) return <div className="space-y-6"><PageHeader title="Student Portal" /><p className="text-muted-foreground">Unable to load.</p></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Student Portal" description="Your enrollment and academic info" />
      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
        <CardContent className="-mt-12 pb-6">
          <div className="flex items-end gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-2xl font-bold shadow-lg border-4 border-background">{student.name?.charAt(0)?.toUpperCase()}</div>
            <div className="pb-1"><h2 className="text-xl font-bold">{student.name}</h2><p className="text-sm text-muted-foreground">{student.enrollmentNo}</p></div>
            <Badge className="ml-auto mb-1" variant={student.activated ? "default" : "secondary"}>{student.activated ? "Active" : "Pending"}</Badge>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" />Father</CardTitle></CardHeader><CardContent><p className="font-semibold">{student.fatherName}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" />Course</CardTitle></CardHeader><CardContent><p className="font-semibold">{student.courseName}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />Admission</CardTitle></CardHeader><CardContent><p className="font-semibold">{new Date(student.admissionDate).toLocaleDateString()}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" />Status</CardTitle></CardHeader><CardContent><Badge variant="outline">{student.status}</Badge></CardContent></Card>
        {student.marksheet && <Card className="border-primary/20 bg-primary/5"><CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Award className="h-4 w-4 text-primary" />Result</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-primary">{student.marksheet.grade}</p><p className="text-sm text-muted-foreground">{student.marksheet.percentage}%</p></CardContent></Card>}
      </div>
    </div>
  );
}
