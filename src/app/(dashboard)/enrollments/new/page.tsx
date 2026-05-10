"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Upload, User, MapPin, BookOpen, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { enrollmentSchema, type EnrollmentFormValues } from "@/features/enrollments/schemas/enrollment.schema";
import { useCreateEnrollment, usePresignedUrl, useUploadImage } from "@/features/enrollments/api/use-enrollments";
import { useCourses } from "@/features/courses/api/use-courses";
import { CATEGORIES, QUALIFICATIONS, SEXES, NATIONALITIES, ID_TYPES, INDIAN_STATES } from "@/lib/constants";
import { toast } from "sonner";

const STEPS = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Address", icon: MapPin },
  { id: 3, title: "Course & ID", icon: BookOpen },
  { id: 4, title: "Photo", icon: Camera },
];

export default function NewEnrollmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { mutate: create, isPending } = useCreateEnrollment();
  const { mutateAsync: getPresignedUrl } = usePresignedUrl();
  const { mutateAsync: uploadImage } = useUploadImage();
  const { data: courses } = useCourses();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: { nationality: "Indian", admissionDate: new Date().toISOString().split("T")[0] },
  });

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setImagePreview(URL.createObjectURL(file));
      const { url } = await getPresignedUrl({ fileName: file.name, fileType: file.type, category: "face" });
      const imageUrl = await uploadImage({ presignedUrl: url, file });
      setValue("imageUrl", imageUrl);
      toast.success("Photo uploaded");
    } catch {
      toast.error("Failed to upload photo");
    }
  }, [getPresignedUrl, uploadImage, setValue]);

  const nextStep = async () => {
    const fieldsPerStep: Record<number, (keyof EnrollmentFormValues)[]> = {
      1: ["name", "fatherName", "motherName", "dob", "sex", "mobile", "email"],
      2: ["address", "state", "district", "ps", "po", "vill", "pincode"],
      3: ["educationalQualification", "category", "courseId", "idType", "idProofNo", "nationality", "admissionDate"],
    };
    const valid = await trigger(fieldsPerStep[step]);
    if (valid) setStep((s) => Math.min(s + 1, 4));
  };

  const onSubmit = (data: EnrollmentFormValues) => {
    create(data, { onSuccess: () => router.push("/enrollments") });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="New Enrollment" description="Add a new student to the system">
        <Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
      </PageHeader>

      {/* Step indicators */}
      <div className="flex items-center gap-2">
        {STEPS.map((s) => (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${step >= s.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s.id}</div>
            <span className={`text-sm hidden sm:inline ${step >= s.id ? "text-foreground" : "text-muted-foreground"}`}>{s.title}</span>
            {s.id < 4 && <div className={`flex-1 h-px ${step > s.id ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Personal */}
        {step === 1 && (
          <Card className="animate-slide-up"><CardHeader><CardTitle>Personal Information</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="full-name">Full Name *</Label><Input id="full-name" {...register("name")} />{errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}</div>
            <div className="space-y-2"><Label htmlFor="father-name">Father&apos;s Name *</Label><Input id="father-name" {...register("fatherName")} />{errors.fatherName && <p className="text-xs text-destructive">{errors.fatherName.message}</p>}</div>
            <div className="space-y-2"><Label htmlFor="mother-name">Mother&apos;s Name *</Label><Input id="mother-name" {...register("motherName")} />{errors.motherName && <p className="text-xs text-destructive">{errors.motherName.message}</p>}</div>
            <div className="space-y-2"><Label htmlFor="dob">Date of Birth *</Label><Input id="dob" type="date" {...register("dob")} />{errors.dob && <p className="text-xs text-destructive">{errors.dob.message}</p>}</div>
            <div className="space-y-2"><Label>Sex *</Label><Select onValueChange={(v) => setValue("sex", v as typeof SEXES[number])}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{SEXES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>{errors.sex && <p className="text-xs text-destructive">{errors.sex.message}</p>}</div>
            <div className="space-y-2"><Label htmlFor="mobile">Mobile (10 digits) *</Label><Input id="mobile" {...register("mobile")} maxLength={10} />{errors.mobile && <p className="text-xs text-destructive">{errors.mobile.message}</p>}</div>
            <div className="space-y-2 sm:col-span-2"><Label htmlFor="email">Email *</Label><Input id="email" type="email" {...register("email")} />{errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}</div>
          </CardContent></Card>
        )}

        {/* Step 2: Address */}
        {step === 2 && (
          <Card className="animate-slide-up"><CardHeader><CardTitle>Address Details</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2"><Label htmlFor="address">Address *</Label><Input id="address" {...register("address")} />{errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}</div>
            <div className="space-y-2"><Label htmlFor="village">Village *</Label><Input id="village" {...register("vill")} />{errors.vill && <p className="text-xs text-destructive">{errors.vill.message}</p>}</div>
            <div className="space-y-2"><Label htmlFor="post-office">Post Office *</Label><Input id="post-office" {...register("po")} />{errors.po && <p className="text-xs text-destructive">{errors.po.message}</p>}</div>
            <div className="space-y-2"><Label htmlFor="police-station">Police Station *</Label><Input id="police-station" {...register("ps")} />{errors.ps && <p className="text-xs text-destructive">{errors.ps.message}</p>}</div>
            <div className="space-y-2"><Label htmlFor="district">District *</Label><Input id="district" {...register("district")} />{errors.district && <p className="text-xs text-destructive">{errors.district.message}</p>}</div>
            <div className="space-y-2"><Label>State *</Label><Select onValueChange={(v) => setValue("state", v as typeof INDIAN_STATES[number])}><SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger><SelectContent>{INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>{errors.state && <p className="text-xs text-destructive">{errors.state.message}</p>}</div>
            <div className="space-y-2"><Label htmlFor="pincode">Pincode *</Label><Input id="pincode" {...register("pincode")} maxLength={6} />{errors.pincode && <p className="text-xs text-destructive">{errors.pincode.message}</p>}</div>
          </CardContent></Card>
        )}

        {/* Step 3: Course & ID */}
        {step === 3 && (
          <Card className="animate-slide-up"><CardHeader><CardTitle>Course &amp; Identification</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Qualification *</Label><Select onValueChange={(v) => setValue("educationalQualification", v as typeof QUALIFICATIONS[number])}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{QUALIFICATIONS.map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}</SelectContent></Select>{errors.educationalQualification && <p className="text-xs text-destructive">{errors.educationalQualification.message}</p>}</div>
            <div className="space-y-2"><Label>Category *</Label><Select onValueChange={(v) => setValue("category", v as typeof CATEGORIES[number])}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>{errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}</div>
            <div className="space-y-2"><Label>Course *</Label><Select onValueChange={(v) => setValue("courseId", v as string)}><SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger><SelectContent>{courses?.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select>{errors.courseId && <p className="text-xs text-destructive">{errors.courseId.message}</p>}</div>
            <div className="space-y-2"><Label>Nationality *</Label><Select defaultValue="Indian" onValueChange={(v) => setValue("nationality", v as typeof NATIONALITIES[number])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{NATIONALITIES.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-2"><Label>ID Type *</Label><Select onValueChange={(v) => setValue("idType", v as typeof ID_TYPES[number])}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{ID_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>{errors.idType && <p className="text-xs text-destructive">{errors.idType.message}</p>}</div>
            <div className="space-y-2"><Label>ID Proof No *</Label><Input {...register("idProofNo")} />{errors.idProofNo && <p className="text-xs text-destructive">{errors.idProofNo.message}</p>}</div>
            <div className="space-y-2"><Label>Admission Date *</Label><Input type="date" {...register("admissionDate")} />{errors.admissionDate && <p className="text-xs text-destructive">{errors.admissionDate.message}</p>}</div>
          </CardContent></Card>
        )}

        {/* Step 4: Photo */}
        {step === 4 && (
          <Card className="animate-slide-up"><CardHeader><CardTitle>Applicant Photo</CardTitle></CardHeader><CardContent>
            <div className="flex flex-col items-center gap-6">
              <div className="relative h-48 w-48 rounded-2xl border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden bg-muted/30">
                {imagePreview ? <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" /> : <Camera className="h-12 w-12 text-muted-foreground/50" />}
              </div>
              <Label htmlFor="photo-upload" className="cursor-pointer"><div className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-accent transition-colors"><Upload className="h-4 w-4" />Upload Photo</div></Label>
              <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              {errors.imageUrl && <p className="text-xs text-destructive">{errors.imageUrl.message}</p>}
            </div>
          </CardContent></Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={() => setStep((s) => Math.max(s - 1, 1))} disabled={step === 1}><ArrowLeft className="h-4 w-4 mr-2" />Previous</Button>
          {step < 4 ? (
            <Button type="button" onClick={nextStep}>Next<ArrowRight className="h-4 w-4 ml-2" /></Button>
          ) : (
            <Button type="submit" disabled={isPending}>{isPending ? "Creating..." : "Create Enrollment"}</Button>
          )}
        </div>
      </form>
    </div>
  );
}
