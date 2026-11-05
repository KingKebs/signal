import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

// Mock data representing leads seeded for Phase 3 dashboard tests
const mockLeads = [
  { id: "L-001", name: "Wayne Enterprises", contact: "bruce@wayne.com", source: "Demo Request", score: 98, status: "New", date: "2 mins ago" },
  { id: "L-002", name: "Stark Industries", contact: "tony@stark.com", source: "Organic Search", score: 95, status: "New", date: "15 mins ago" },
  { id: "L-003", name: "Acme Corp", contact: "jane@acme.com", source: "Referral", score: 72, status: "Contacted", date: "2 hours ago" },
  { id: "L-004", name: "Globex", contact: "contact@globex.com", source: "Demo Request", score: 85, status: "Qualified", date: "5 hours ago" },
  { id: "L-005", name: "Initech", contact: "hank@initech.com", source: "Partner API", score: 45, status: "Archived", date: "1 day ago" },
  { id: "L-006", name: "Massive Dynamic", contact: "info@massive.com", source: "Organic Search", score: 88, status: "New", date: "1 day ago" },
];

export default function LeadsQueuePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">Leads Queue</h1>
          <p className="text-muted-foreground">Manage and follow up with your assigned leads.</p>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          Capture Manual Lead
        </Button>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 w-full max-w-sm">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search leads..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {mockLeads.length} leads
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company / Contact</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Priority Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div className="font-medium text-primary">{lead.name}</div>
                      <div className="text-sm text-muted-foreground">{lead.contact}</div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{lead.source}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          lead.score > 90 
                            ? "bg-accent/10 text-accent border-accent/20" 
                            : lead.score > 70 
                              ? "bg-blue-500/10 text-blue-500 border-blue-500/20" 
                              : ""
                        }
                      >
                        {lead.score}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={lead.status === "New" ? "secondary" : "outline"}
                      >
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{lead.date}</TableCell>
                    <TableCell className="text-right">
                      {lead.status === "New" ? (
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                          Follow Up
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
