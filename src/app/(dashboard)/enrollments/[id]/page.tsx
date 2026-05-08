"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EnrollmentDetailPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Enrollment Details" description="View and manage enrollment information" />
      <Card>
        <CardHeader><CardTitle>Student Information</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Enrollment detail view will display student data when connected to the backend.</p>
        </CardContent>
      </Card>
    </div>
  );
}
