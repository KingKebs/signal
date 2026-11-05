export default function SolutionsPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-4xl text-center">
      <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-6">
        Built for high-velocity teams
      </h1>
      <p className="text-xl text-muted-foreground mb-16">
        Signal is optimized for industries where speed to lead and focused follow-ups define commercial success.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="bg-secondary/30 p-8 rounded-2xl border border-border">
          <h2 className="text-2xl font-bold text-primary mb-4">B2B Service Firms</h2>
          <p className="text-muted-foreground mb-6">
            Stop losing lucrative consultancies and service contracts to faster competitors. Signal ensures every inbound inquiry from your website is immediately routed to the right partner or sales rep based on company size or service interest.
          </p>
          <ul className="space-y-3 text-sm text-primary">
            <li className="flex gap-2">✓ Rapid routing of consultation requests</li>
            <li className="flex gap-2">✓ Qualify by budget or employee count</li>
            <li className="flex gap-2">✓ Measure partner response times</li>
          </ul>
        </div>

        <div className="bg-secondary/30 p-8 rounded-2xl border border-border">
          <h2 className="text-2xl font-bold text-primary mb-4">Property & Real Estate</h2>
          <p className="text-muted-foreground mb-6">
            When high-value property listings generate massive interest, your agents need to know who the highest-intent buyers are. Prioritize leads based on their submission history and pre-qualification data automatically.
          </p>
          <ul className="space-y-3 text-sm text-primary">
            <li className="flex gap-2">✓ Score leads based on viewing requests</li>
            <li className="flex gap-2">✓ Automate initial qualification texts</li>
            <li className="flex gap-2">✓ Track outcomes across regional offices</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
