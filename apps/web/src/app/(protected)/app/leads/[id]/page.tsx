import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LeadActions from "./LeadActions";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Calendar } from "lucide-react";

async function getLead(id: string) {
  const res = await fetch(`http://api:4000/api/leads/${id}`, {
    cache: 'no-store',
    headers: {
      "x-tenant-id": "mock-tenant-1",
    }
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch lead");
  }

  return res.json();
}

export default async function LeadDetailsPage({ params }: { params: { id: string } }) {
  const lead = await getLead(params.id);

  if (!lead) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/app/leads" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary flex items-center space-x-3">
            <span>{lead.company || lead.name}</span>
            <Badge variant={lead.status === "New" ? "secondary" : "outline"}>
              {lead.status}
            </Badge>
          </h1>
          <p className="text-muted-foreground">Lead ID: {lead.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Name</div>
                  <div className="text-base">{lead.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Email</div>
                  <div className="text-base flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{lead.email}</span>
                  </div>
                </div>
                {lead.phone && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Phone</div>
                    <div className="text-base flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{lead.phone}</span>
                    </div>
                  </div>
                )}
                {lead.company && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Company</div>
                    <div className="text-base">{lead.company}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lead Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Source</div>
                  <div className="text-base">{lead.source}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Priority Score</div>
                  <div className="text-base">
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
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Created At</div>
                  <div className="text-base" suppressHydrationWarning>{new Date(lead.createdAt).toLocaleString()}</div>
                </div>
                {lead.scoreReason && (
                  <div className="col-span-2">
                    <div className="text-sm font-medium text-muted-foreground">Score Reason</div>
                    <div className="text-base p-3 bg-muted/50 rounded-md mt-1">{lead.scoreReason}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <LeadActions leadId={lead.id} currentStatus={lead.status} />
        </div>
      </div>
    </div>
  );
}
