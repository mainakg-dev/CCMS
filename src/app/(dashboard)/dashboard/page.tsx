"use client";

import {
  Users,
  FileCheck,
  BookOpen,
  Building2,
  TrendingUp,
  Activity,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { useAuthStore } from "@/stores/auth-store";

const stats = [
  {
    title: "Total Enrollments",
    value: "—",
    change: "",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Active Students",
    value: "—",
    change: "",
    icon: GraduationCap,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Exams Pending",
    value: "—",
    change: "",
    icon: FileCheck,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    title: "Courses",
    value: "—",
    change: "",
    icon: BookOpen,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Centers",
    value: "—",
    change: "",
    icon: Building2,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Pass Rate",
    value: "—",
    change: "",
    icon: TrendingUp,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${user?.name || "User"}`}
        description="Here's an overview of your institute's performance."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <Card
            key={stat.title}
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">
                {stat.value}
              </div>
              {stat.change && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">{stat.change}</span>
                  from last month
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              Activity data will appear here once connected to the backend.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
