"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Loader2 } from "lucide-react";

export default function LeadActions({ leadId, currentStatus }: { leadId: string, currentStatus: string }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const statuses = ["New", "Qualified", "Contacted", "Converted", "Disqualified"];

  const updateStatus = async (status: string) => {
    if (status === currentStatus) return;
    
    try {
      setIsUpdating(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": "mock-tenant-1",
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="border-accent/20 shadow-sm relative overflow-hidden">
      {isUpdating && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
      <CardHeader className="bg-accent/5 pb-4">
        <CardTitle className="text-lg text-primary flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-accent" />
          <span>Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          Log Follow Up
        </Button>
        <Button variant="outline" className="w-full">
          Schedule Meeting
        </Button>
        <div className="pt-4 border-t border-border">
          <div className="text-sm font-medium text-muted-foreground mb-2">Update Status</div>
          <div className="flex flex-wrap gap-2">
            {statuses.map(status => (
              <Button 
                key={status} 
                variant={currentStatus === status ? "default" : "outline"} 
                size="sm"
                className={currentStatus === status ? "bg-primary text-primary-foreground" : ""}
                onClick={() => updateStatus(status)}
                disabled={isUpdating}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
