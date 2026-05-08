"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader as PH } from "@/components/shared/page-header";

export default function ExamFormFillupPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Exam Form Fillup" description="Submit exam forms for verified students" />
      <Card><CardHeader><CardTitle>Form Fillup</CardTitle></CardHeader><CardContent>
        <p className="text-muted-foreground">Use the main Exams page for form fillup functionality.</p>
      </CardContent></Card>
    </div>
  );
}
