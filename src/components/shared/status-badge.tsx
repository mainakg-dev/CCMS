"use client";

import { Badge } from "@/components/ui/badge";
import { EnrollmentStatus } from "@/lib/constants";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  EnrollmentStatus,
  { label: string; className: string }
> = {
  [EnrollmentStatus.PENDING]: {
    label: "Pending",
    className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  [EnrollmentStatus.ENROLLMENT_DONE]: {
    label: "Enrolled",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  [EnrollmentStatus.ENROLLMENT_VERIFIED]: {
    label: "Verified",
    className: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  },
  [EnrollmentStatus.EXAM_FORM_VERIFIED]: {
    label: "Exam Verified",
    className: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  },
  [EnrollmentStatus.MARKSHEET_VERIFIED]: {
    label: "Marks Verified",
    className: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  },
  [EnrollmentStatus.MARKSHEET_APPROVED]: {
    label: "Approved",
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  [EnrollmentStatus.PASS_OUT]: {
    label: "Passed Out",
    className: "bg-green-500/10 text-green-500 border-green-500/20",
  },
};

interface StatusBadgeProps {
  status: EnrollmentStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    className: "bg-muted text-muted-foreground",
  };

  return (
    <Badge
      variant="outline"
      className={cn("font-medium text-xs", config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
