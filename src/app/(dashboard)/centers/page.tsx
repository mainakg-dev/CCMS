"use client";

import { EmptyState } from "@/components/shared/empty-state";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCenters } from "@/features/centers/api/use-centers";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

export default function CentersPage() {
  const { data: centers, isLoading } = useCenters();

  if (isLoading)
    return (
      <div className="space-y-6">
        <PageHeader title="Centers" />
        <LoadingSkeleton variant="card" count={6} />
      </div>
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Centers"
        description="View registered centers and branches"
      />
      {!centers?.length ? (
        <EmptyState
          title="No centers found"
          description="Centers will appear here once registered."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {centers.map((center) => (
            <Card
              key={center.id}
              className="group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">{center.name}</CardTitle>
                    <p className="text-xs text-muted-foreground font-mono">
                      {center.code}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate">{center.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{center.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{center.phone}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
