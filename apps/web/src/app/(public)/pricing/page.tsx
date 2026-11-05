import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="outline" className="mb-4">Provisional Pricing</Badge>
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-6">
          Simple, predictable pricing
        </h1>
        <p className="text-xl text-muted-foreground">
          No hidden fees. No complex capacity limits. Just straightforward pricing designed to scale with your sales operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Starter Plan */}
        <div className="flex flex-col p-8 rounded-2xl border border-border bg-card">
          <h3 className="text-lg font-semibold text-primary mb-2">Starter</h3>
          <p className="text-muted-foreground text-sm mb-6">For small teams establishing a baseline workflow.</p>
          <div className="mb-6">
            <span className="text-4xl font-bold text-primary">$49</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex gap-3 text-sm text-primary"><Check className="h-5 w-5 text-accent shrink-0" /> Up to 3 user seats</li>
            <li className="flex gap-3 text-sm text-primary"><Check className="h-5 w-5 text-accent shrink-0" /> 1,000 active leads/mo</li>
            <li className="flex gap-3 text-sm text-primary"><Check className="h-5 w-5 text-accent shrink-0" /> Basic rule scoring</li>
            <li className="flex gap-3 text-sm text-primary"><Check className="h-5 w-5 text-accent shrink-0" /> Standard reporting</li>
          </ul>
          <Button className="w-full" variant="outline">Start Trial</Button>
        </div>

        {/* Growth Plan */}
        <div className="flex flex-col p-8 rounded-2xl border-2 border-accent bg-card relative shadow-lg">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
              Recommended
            </span>
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">Growth</h3>
          <p className="text-muted-foreground text-sm mb-6">For scaling sales organizations that need advanced logic.</p>
          <div className="mb-6">
            <span className="text-4xl font-bold text-primary">$149</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex gap-3 text-sm text-primary"><Check className="h-5 w-5 text-accent shrink-0" /> Up to 10 user seats</li>
            <li className="flex gap-3 text-sm text-primary"><Check className="h-5 w-5 text-accent shrink-0" /> 10,000 active leads/mo</li>
            <li className="flex gap-3 text-sm text-primary"><Check className="h-5 w-5 text-accent shrink-0" /> Advanced priority logic</li>
            <li className="flex gap-3 text-sm text-primary"><Check className="h-5 w-5 text-accent shrink-0" /> Webhook integrations</li>
          </ul>
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Get Started</Button>
        </div>

        {/* Business Plan */}
        <div className="flex flex-col p-8 rounded-2xl border border-border bg-card">
          <h3 className="text-lg font-semibold text-primary mb-2">Business</h3>
          <p className="text-muted-foreground text-sm mb-6">For enterprise volumes and strict compliance needs.</p>
          <div className="mb-6">
            <span className="text-4xl font-bold text-primary">$499</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex gap-3 text-sm text-primary"><Check className="h-5 w-5 text-accent shrink-0" /> Unlimited user seats</li>
            <li className="flex gap-3 text-sm text-primary"><Check className="h-5 w-5 text-accent shrink-0" /> Unlimited active leads</li>
            <li className="flex gap-3 text-sm text-primary"><Check className="h-5 w-5 text-accent shrink-0" /> Custom integrations</li>
            <li className="flex gap-3 text-sm text-primary"><Check className="h-5 w-5 text-accent shrink-0" /> Dedicated account manager</li>
          </ul>
          <Button className="w-full" variant="outline">Contact Sales</Button>
        </div>
      </div>
    </div>
  );
}
