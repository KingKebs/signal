"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, Filter } from "lucide-react";

export default function LeadsClient({ leads }: { leads: any[] }) {
  const [search, setSearch] = useState("");

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(search.toLowerCase()) || 
    lead.email.toLowerCase().includes(search.toLowerCase())
  );

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {filteredLeads.length} leads
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
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div className="font-medium text-primary">{lead.company || lead.name}</div>
                      <div className="text-sm text-muted-foreground">{lead.email}</div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{lead.source}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          lead.priorityScore > 90 
                            ? "bg-accent/10 text-accent border-accent/20" 
                            : lead.priorityScore > 70 
                              ? "bg-blue-500/10 text-blue-500 border-blue-500/20" 
                              : ""
                        }
                      >
                        {lead.priorityScore}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={lead.status === "New" ? "secondary" : "outline"}
                      >
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm" suppressHydrationWarning>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {lead.status === "New" ? (
                        <Link href={`/app/leads/${lead.id}`}>
                          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                            Follow Up
                          </Button>
                        </Link>
                      ) : (
                        <Link href={`/app/leads/${lead.id}`}>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </Link>
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
