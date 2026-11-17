import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Users, CheckCircle2, Clock, DollarSign } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

async function getDashboardStats() {
  const res = await fetch(`http://api:4000/api/leads/dashboard/stats`, {
    headers: {
      "x-tenant-id": "mock-tenant-1",
    },
    cache: "no-store", // Ensure real-time data
  });
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }
  return res.json();
}

export default async function DashboardOverview() {
  const stats = await getDashboardStats();
  
  // Format the KPIs for display
  const kpis = [
    { title: "Total Leads", value: stats.kpis.totalLeads.toString(), trend: "+12%", up: true, icon: Users },
    { title: "Qualified", value: stats.kpis.qualifiedLeads.toString(), trend: "+8%", up: true, icon: CheckCircle2 },
    { title: "Awaiting Follow-up", value: stats.kpis.awaitingFollowUp.toString(), trend: "-5%", up: false, icon: Clock },
    { title: "Pipeline Value", value: `$${(stats.kpis.pipelineValue / 1000).toFixed(1)}K`, trend: "+18%", up: true, icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      {/* Top KPI Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="border-border shadow-sm flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end">
              <div className="text-3xl font-bold tracking-tight text-primary mb-1">{kpi.value}</div>
              <p className="text-xs flex items-center mt-1">
                <span className={kpi.up ? "text-accent flex items-center font-medium" : "text-destructive flex items-center font-medium"}>
                  {kpi.up ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {kpi.trend}
                </span>
                <span className="text-muted-foreground ml-1.5">vs last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Middle Row: Charts / Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-border shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-primary text-lg font-semibold tracking-tight">Pipeline Overview</CardTitle>
            <CardDescription className="text-sm">Current lead distribution by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {stats.dealStages.map((stage: any) => (
                <div key={stage.stage} className="flex items-center group">
                  <div className="w-28 text-sm font-medium text-primary">{stage.stage}</div>
                  <div className="flex-1 mx-4">
                    {/* Progress Bar representation */}
                    <div className="h-7 w-full bg-secondary rounded-full overflow-hidden flex items-center shadow-inner">
                      <div 
                        className={`h-full ${stage.color} flex items-center px-3 text-xs font-medium text-white shadow-sm transition-all`}
                        style={{ width: `${Math.max(15, (stage.count / Math.max(stats.kpis.totalLeads, 1)) * 100)}%` }}
                      >
                        {stage.count}
                      </div>
                    </div>
                  </div>
                  <div className="w-20 text-right text-sm text-muted-foreground">{stage.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-border shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-primary text-lg font-semibold tracking-tight">Recent Activity</CardTitle>
            <CardDescription className="text-sm">Latest actions across your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-7">
              {stats.recentActivity.length === 0 ? (
                <div className="text-sm text-muted-foreground">No recent activity.</div>
              ) : stats.recentActivity.map((activity: any, index: number) => (
                <div key={index} className="flex items-center">
                  <div className={`h-2 w-2 mt-1 rounded-full mr-4 ${
                    activity.status === 'alert' ? 'bg-amber-500' : 
                    activity.status === 'new' ? 'bg-blue-500' : 'bg-accent'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-primary">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.lead}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom Row: Quick Queue */}
      <Card className="border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-primary text-lg font-semibold tracking-tight">Priority Queue</CardTitle>
            <CardDescription>Leads requiring immediate attention</CardDescription>
          </div>
          <Link href="/app/leads">
            <Button variant="outline" size="sm">
              View all leads
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {stats.priorityQueue.length === 0 ? (
            <div className="text-sm text-muted-foreground py-4 text-center">Your queue is clear!</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Priority Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.priorityQueue.map((lead: any) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium text-primary">{lead.company || lead.name}</TableCell>
                    <TableCell>{lead.source}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        lead.priorityScore >= 80 ? "bg-accent/10 text-accent border-accent/20" :
                        lead.priorityScore >= 50 ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : ""
                      }>
                        {lead.priorityScore} - {lead.priorityScore >= 80 ? 'High' : lead.priorityScore >= 50 ? 'Med' : 'Low'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={lead.status === 'New' ? "secondary" : "outline"}>{lead.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/app/leads/${lead.id}`}>
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                          Follow Up
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
