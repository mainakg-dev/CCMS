"use client";

import { UserCog, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { useCoordinators } from "@/features/admin/api/use-admin";

export default function CoordinatorsPage() {
  const { data: coordinators, isLoading } = useCoordinators();

  if (isLoading) return <div className="space-y-6"><PageHeader title="Coordinators" /><LoadingSkeleton variant="card" count={4} /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Coordinators" description="Manage system coordinators" />
      {!coordinators?.length ? (
        <EmptyState title="No coordinators" description="Coordinator data will appear here." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {coordinators.map((coord) => (
            <Card key={coord.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"><UserCog className="h-5 w-5 text-primary" /></div>
                  <div><CardTitle className="text-sm">{coord.name}</CardTitle><p className="text-xs text-muted-foreground">{coord.role}</p></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{coord.email}</div>
                <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{coord.phone}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
