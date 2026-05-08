"use client";

import { useState } from "react";
import { Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useEnquiries, useDeleteEnquiry, useGenerateFranchise } from "@/features/centers/api/use-centers";

export default function EnquiriesPage() {
  const { data: enquiries, isLoading } = useEnquiries();
  const { mutate: deleteEnquiry, isPending: isDeleting } = useDeleteEnquiry();
  const { mutate: generateFranchise } = useGenerateFranchise();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  if (isLoading) return <div className="space-y-6"><PageHeader title="Enquiries" /><LoadingSkeleton variant="table" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Franchise Enquiries" description="Manage franchise applications and approvals" />
      {!enquiries?.length ? (
        <EmptyState title="No enquiries" description="Franchise enquiries will appear here." />
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Address</TableHead><TableHead className="text-right">Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {enquiries.map((enq) => (
                <TableRow key={enq.id}>
                  <TableCell className="font-medium">{enq.name}</TableCell>
                  <TableCell>{enq.email}</TableCell>
                  <TableCell>{enq.phone}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{enq.address}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => generateFranchise(enq.id)}><CheckCircle className="h-3.5 w-3.5 mr-1" />Approve</Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setDeleteTarget(enq.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <ConfirmDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)} title="Delete Enquiry" description="This will permanently remove this enquiry." confirmLabel="Delete" variant="destructive" loading={isDeleting} onConfirm={() => { if (deleteTarget) { deleteEnquiry(deleteTarget); setDeleteTarget(null); } }} />
    </div>
  );
}
