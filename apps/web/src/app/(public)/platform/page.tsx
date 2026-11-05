import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Filter, ArrowRight, BarChart3 } from "lucide-react";

export default function PlatformPage() {
  const steps = [
    {
      title: "1. Capture",
      description: "Securely accept leads via contact forms, landing pages, or authorized integrations. We automatically append source tracking and consent metadata.",
      icon: Users,
    },
    {
      title: "2. Prioritize",
      description: "Stop guessing who to call first. Our transparent rule-based engine scores incoming leads based on firmographic data and activity signals.",
      icon: Filter,
    },
    {
      title: "3. Follow Up",
      description: "Assign owners, log activity notes, and schedule the next touchpoint all from a focused, high-speed dashboard built for sales operators.",
      icon: ArrowRight,
    },
    {
      title: "4. Measure",
      description: "Close the loop by recording definitive commercial outcomes. View dashboards for response times, conversion rates, and pipeline velocity.",
      icon: BarChart3,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-6">
          The Signal Workflow
        </h1>
        <p className="text-xl text-muted-foreground">
          A four-step framework to turn missed opportunities into measurable revenue. Simple, focused, and effective.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <Card key={index} className="border-border shadow-sm">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-2xl text-primary">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
