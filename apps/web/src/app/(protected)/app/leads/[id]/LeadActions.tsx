"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Loader2, X } from "lucide-react";

export default function LeadActions({ leadId, currentStatus }: { leadId: string, currentStatus: string }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const [followUp, setFollowUp] = useState({
    actionType: "Call",
    notes: "",
    status: "Completed",
    scheduledAt: new Date().toISOString().slice(0, 16)
  });

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

  const submitFollowUp = async () => {
    try {
      setIsUpdating(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/${leadId}/follow-ups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": "mock-tenant-1",
        },
        body: JSON.stringify({
          ...followUp,
          scheduledAt: new Date(followUp.scheduledAt).toISOString()
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFollowUp({ ...followUp, notes: "" }); // Reset notes
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to log follow up", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
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
          <Button 
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => setIsModalOpen(true)}
          >
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

      {/* Simple Modal for Logging Follow Up */}
      {isModalOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md shadow-xl animate-in fade-in zoom-in-95">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>Log Follow Up</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Action Type</Label>
                <div className="flex gap-2">
                  {["Call", "Email", "Meeting", "Note"].map(type => (
                    <Button 
                      key={type}
                      size="sm"
                      variant={followUp.actionType === type ? "default" : "outline"}
                      onClick={() => setFollowUp({...followUp, actionType: type})}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <textarea 
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="What happened during this follow up?"
                  value={followUp.notes}
                  onChange={(e) => setFollowUp({...followUp, notes: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Date & Time</Label>
                <Input 
                  type="datetime-local" 
                  value={followUp.scheduledAt}
                  onChange={(e) => setFollowUp({...followUp, scheduledAt: e.target.value})}
                />
              </div>
              <div className="pt-4 flex justify-end gap-2 border-t border-border">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={submitFollowUp}>
                  Save Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>,
        document.body
      )}
    </>
  );
}
