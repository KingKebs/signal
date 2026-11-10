import LeadsClient from "./LeadsClient";

async function getLeads() {
  const res = await fetch("http://api:4000/api/leads", {
    cache: 'no-store', // Always fetch latest
    headers: {
      "x-tenant-id": "mock-tenant-1",
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch leads");
  }

  return res.json();
}

export default async function LeadsQueuePage() {
  const leads = await getLeads();

  return <LeadsClient leads={leads} />;
}
