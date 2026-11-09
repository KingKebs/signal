import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Users, CheckCircle2, Clock, DollarSign } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Mock data for Phase 3
const dashboardData = {
  kpis: [
    { title: "Total Leads", value: "1,247", trend: "+12%", up: true, icon: Users },
    { title: "Qualified", value: "312", trend: "+8%", up: true, icon: CheckCircle2 },
    { title: "Awaiting Follow-up", value: "23", trend: "-5%", up: false, icon: Clock },
    { title: "Pipeline Value", value: "$4.2M", trend: "+18%", up: true, icon: DollarSign },
  ],
  dealStages: [
    { stage: "New", count: 423, value: "$4.2M", color: "bg-blue-500" },
    { stage: "Qualified", count: 312, value: "$3.1M", color: "bg-indigo-500" },
    { stage: "Proposal", count: 156, value: "$1.6M", color: "bg-accent" },
    { stage: "Negotiation", count: 89, value: "$890K", color: "bg-amber-500" },
    { stage: "Closed Won", count: 34, value: "$340K", color: "bg-emerald-500" },
  ],
  recentActivity: [
    { action: "Follow-up logged", lead: "Jane Doe", time: "2 minutes ago", status: "completed" },
    { action: "New lead captured", lead: "Acme Corp", time: "15 minutes ago", status: "new" },
    { action: "High priority alert", lead: "Stark Industries", time: "1 hour ago", status: "alert" },
    { action: "Demo scheduled", lead: "Wayne Ent.", time: "2 hours ago", status: "completed" },
  ]
};

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Top KPI Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardData.kpis.map((kpi, index) => (
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
              {dashboardData.dealStages.map((stage) => (
                <div key={stage.stage} className="flex items-center group">
                  <div className="w-28 text-sm font-medium text-primary">{stage.stage}</div>
                  <div className="flex-1 mx-4">
                    {/* Mock Progress Bar representation */}
                    <div className="h-7 w-full bg-secondary rounded-full overflow-hidden flex items-center shadow-inner">
                      <div 
                        className={`h-full ${stage.color} flex items-center px-3 text-xs font-medium text-white shadow-sm transition-all`}
                        style={{ width: `${Math.max(15, (stage.count / 423) * 100)}%` }}
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
              {dashboardData.recentActivity.map((activity, index) => (
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
                    {activity.time}
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
          <Button variant="outline" size="sm" asChild>
            <a href="/app/leads">View all leads</a>
          </Button>
        </CardHeader>
        <CardContent>
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
              <TableRow>
                <TableCell className="font-medium text-primary">Wayne Enterprises</TableCell>
                <TableCell>Demo Request</TableCell>
                <TableCell><Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">98 - High</Badge></TableCell>
                <TableCell><Badge variant="secondary">New</Badge></TableCell>
                <TableCell className="text-right">
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">Follow Up</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-primary">Stark Industries</TableCell>
                <TableCell>Organic Search</TableCell>
                <TableCell><Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">95 - High</Badge></TableCell>
                <TableCell><Badge variant="secondary">New</Badge></TableCell>
                <TableCell className="text-right">
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">Follow Up</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-primary">Acme Corp</TableCell>
                <TableCell>Referral</TableCell>
                <TableCell><Badge variant="outline">72 - Med</Badge></TableCell>
                <TableCell><Badge variant="outline">Contacted</Badge></TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">View</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}