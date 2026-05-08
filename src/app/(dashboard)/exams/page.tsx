"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileCheck, Search, ClipboardList, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/page-header";
import { examFormFillupSchema, type ExamFormFillupFormValues } from "@/features/exams/schemas/exam.schema";
import { useExamFormDataFetch, useExamFormFillup, useGenerateAdmitCard } from "@/features/exams/api/use-exams";
import { Badge } from "@/components/ui/badge";

export default function ExamsPage() {
  const [studentInfo, setStudentInfo] = useState<{ studentName: string; courseName: string; activated: boolean } | null>(null);
  const { mutate: fetchData, isPending: isFetching } = useExamFormDataFetch();
  const { mutate: submitForm, isPending: isSubmitting } = useExamFormFillup();
  const { mutate: generateAdmit } = useGenerateAdmitCard();
  const [searchNo, setSearchNo] = useState("");

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ExamFormFillupFormValues>({
    resolver: zodResolver(examFormFillupSchema),
  });

  const handleSearch = () => {
    if (!searchNo) return;
    fetchData(searchNo, {
      onSuccess: (data) => {
        setStudentInfo(data);
        setValue("enrollmentNo", searchNo);
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Examinations" description="Manage exam forms, admit cards, and marks entry" />

      <Tabs defaultValue="form-fillup" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="form-fillup" className="gap-2"><ClipboardList className="h-4 w-4" />Form Fillup</TabsTrigger>
          <TabsTrigger value="admit-card" className="gap-2"><Printer className="h-4 w-4" />Admit Card</TabsTrigger>
          <TabsTrigger value="marks-entry" className="gap-2"><FileCheck className="h-4 w-4" />Marks Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="form-fillup">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle>Search Student</CardTitle>
                <CardDescription>Enter enrollment number to fetch student details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Enrollment Number" value={searchNo} onChange={(e) => setSearchNo(e.target.value)} />
                  <Button onClick={handleSearch} disabled={isFetching}><Search className="h-4 w-4 mr-2" />{isFetching ? "..." : "Search"}</Button>
                </div>
                {studentInfo && (
                  <div className="rounded-lg border p-4 space-y-2 animate-slide-up">
                    <div className="flex justify-between"><span className="text-sm text-muted-foreground">Student</span><span className="font-medium">{studentInfo.studentName}</span></div>
                    <div className="flex justify-between"><span className="text-sm text-muted-foreground">Course</span><span>{studentInfo.courseName}</span></div>
                    <div className="flex justify-between"><span className="text-sm text-muted-foreground">Status</span><Badge variant={studentInfo.activated ? "default" : "destructive"}>{studentInfo.activated ? "Activated" : "Not Activated"}</Badge></div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Form */}
            <Card>
              <CardHeader><CardTitle>Exam Form</CardTitle><CardDescription>Fill in exam details and submit</CardDescription></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit((data) => submitForm(data))} className="space-y-4">
                  <div className="space-y-2"><Label>ATI Code *</Label><Input {...register("atiCode")} />{errors.atiCode && <p className="text-xs text-destructive">{errors.atiCode.message}</p>}</div>
                  <div className="space-y-2"><Label>Center Code *</Label><Input {...register("centerCode")} />{errors.centerCode && <p className="text-xs text-destructive">{errors.centerCode.message}</p>}</div>
                  <div className="space-y-2"><Label>Payment Receipt No *</Label><Input {...register("lastPaymentReceiptNo")} />{errors.lastPaymentReceiptNo && <p className="text-xs text-destructive">{errors.lastPaymentReceiptNo.message}</p>}</div>
                  <Button type="submit" className="w-full" disabled={isSubmitting || !studentInfo?.activated}>{isSubmitting ? "Submitting..." : "Submit Exam Form"}</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="admit-card">
          <Card><CardHeader><CardTitle>Generate Admit Card</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="flex gap-2 max-w-md">
              <Input placeholder="Enrollment Number" id="admit-enrollment" />
              <Button onClick={() => { const el = document.getElementById("admit-enrollment") as HTMLInputElement; if (el?.value) generateAdmit({ enrollmentNo: el.value }); }}><Printer className="h-4 w-4 mr-2" />Generate</Button>
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="marks-entry">
          <Card><CardHeader><CardTitle>Marks Entry</CardTitle><CardDescription>Enter marks for verified exam forms</CardDescription></CardHeader><CardContent>
            <p className="text-muted-foreground text-sm">Navigate to the marks entry page for detailed marks input with automatic grade calculation.</p>
            <Button className="mt-4" onClick={() => window.location.href = "/exams/marks-entry"}>Open Marks Entry</Button>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
