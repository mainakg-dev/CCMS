"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { useCreateNotice } from "@/features/admin/api/use-admin";

export default function NoticesPage() {
  const { mutate: createNotice, isPending } = useCreateNotice();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<{ title: string; content: string }>();

  return (
    <div className="space-y-6">
      <PageHeader title="Notice Board" description="Create and manage notices">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button><Plus className="h-4 w-4 mr-2" />New Notice</Button>} />
          <DialogContent>
            <DialogHeader><DialogTitle>Create Notice</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit((data) => createNotice(data, { onSuccess: () => { setOpen(false); reset(); } }))} className="space-y-4">
              <div className="space-y-2"><Label>Title</Label><Input {...register("title", { required: true })} /></div>
              <div className="space-y-2"><Label>Content</Label><Textarea {...register("content", { required: true })} rows={5} /></div>
              <Button type="submit" className="w-full" disabled={isPending}>{isPending ? "Creating..." : "Publish Notice"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>
      <EmptyState icon={<Bell className="h-8 w-8 text-muted-foreground" />} title="No notices yet" description="Create your first notice to inform students and centers." actionLabel="Create Notice" onAction={() => setOpen(true)} />
    </div>
  );
}
