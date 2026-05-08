"use client";

import { useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, MoreHorizontal, Eye, Pencil, Trash2, IdCard, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useEnrollments, useDeleteEnrollment, useActivateEnrollment, useDeactivateEnrollment, useGenerateIdCard } from "@/features/enrollments/api/use-enrollments";
import type { Enrollment } from "@/features/enrollments/types/enrollment.types";
import { Badge } from "@/components/ui/badge";

export default function EnrollmentsPage() {
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useEnrollments();
  const { mutate: deleteEnrollment, isPending: isDeleting } = useDeleteEnrollment();
  const { mutate: activate } = useActivateEnrollment();
  const { mutate: deactivate } = useDeactivateEnrollment();
  const { mutate: generateId } = useGenerateIdCard();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastRowRef = useCallback((node: HTMLTableRowElement | null) => {
    if (isFetchingNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
    });
    if (node) observerRef.current.observe(node);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  const all = data?.pages.flatMap((p) => p.enrollments) ?? [];
  const filtered = searchQuery
    ? all.filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.enrollmentNo.toLowerCase().includes(searchQuery.toLowerCase()))
    : all;

  if (isLoading) return <div className="space-y-6"><PageHeader title="Enrollments" /><LoadingSkeleton variant="table" count={8} /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Enrollments" description="Manage student enrollments and admissions">
        <Button onClick={() => router.push("/enrollments/new")}><Plus className="h-4 w-4 mr-2" />New Enrollment</Button>
      </PageHeader>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name or enrollment no..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
      </div>
      {filtered.length === 0 ? (
        <EmptyState title="No enrollments found" description="Start by adding a new student enrollment." actionLabel="New Enrollment" onAction={() => router.push("/enrollments/new")} />
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead>Enrollment No.</TableHead><TableHead>Student Name</TableHead><TableHead>Course</TableHead><TableHead>Mobile</TableHead><TableHead>Status</TableHead><TableHead>Active</TableHead><TableHead className="w-12"></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.map((enrollment: Enrollment, index: number) => (
                <TableRow key={enrollment.id} ref={index === filtered.length - 1 ? lastRowRef : undefined} className="group cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => router.push(`/enrollments/${enrollment.id}`)}>
                  <TableCell className="font-mono text-sm">{enrollment.enrollmentNo}</TableCell>
                  <TableCell className="font-medium">{enrollment.name}</TableCell>
                  <TableCell className="text-muted-foreground">{enrollment.courseName || "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{enrollment.mobile}</TableCell>
                  <TableCell><StatusBadge status={enrollment.status} /></TableCell>
                  <TableCell><Badge variant={enrollment.activated ? "default" : "secondary"} className="text-xs">{enrollment.activated ? "Active" : "Inactive"}</Badge></TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu><DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="h-4 w-4" /></Button>} />
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/enrollments/${enrollment.id}`)}><Eye className="h-4 w-4 mr-2" />View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/enrollments/${enrollment.id}`)}><Pencil className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {enrollment.activated ? <DropdownMenuItem onClick={() => deactivate(enrollment.id)}><ToggleLeft className="h-4 w-4 mr-2" />Deactivate</DropdownMenuItem> : <DropdownMenuItem onClick={() => activate(enrollment.id)}><ToggleRight className="h-4 w-4 mr-2" />Activate</DropdownMenuItem>}
                        {enrollment.activated && <DropdownMenuItem onClick={() => generateId(enrollment.id)}><IdCard className="h-4 w-4 mr-2" />Generate ID</DropdownMenuItem>}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(enrollment.id)}><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isFetchingNextPage && <div className="flex justify-center py-4"><span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>}
        </div>
      )}
      <ConfirmDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)} title="Delete Enrollment" description="This action cannot be undone." confirmLabel="Delete" variant="destructive" loading={isDeleting} onConfirm={() => { if (deleteTarget) { deleteEnrollment(deleteTarget); setDeleteTarget(null); } }} />
    </div>
  );
}
