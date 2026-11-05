import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-8">
            <Zap className="h-3 w-3 mr-1 text-accent" />
            Revenue Intelligence Platform
          </div>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-primary sm:text-7xl">
            Revenue Intelligence, <br className="hidden sm:inline" />
            <span className="text-accent">Unified</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Capture legitimate enquiries, prioritize opportunities, and automate timely sales follow-up. Align your sales and marketing teams on a single source of truth.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/platform">
                Watch demo
              </Link>
            </Button>
          </div>

          {/* Stats / Features Row */}
          <div className="mt-20 grid grid-cols-1 gap-y-8 border-t pt-10 sm:grid-cols-3 sm:gap-x-8">
            <div className="flex flex-col items-center">
              <dt className="text-sm leading-6 text-muted-foreground">Faster pipeline velocity</dt>
              <dd className="text-3xl font-bold tracking-tight text-primary">3.2x</dd>
            </div>
            <div className="flex flex-col items-center">
              <dt className="text-sm leading-6 text-muted-foreground">Forecasting accuracy</dt>
              <dd className="text-3xl font-bold tracking-tight text-accent">98.7%</dd>
            </div>
            <div className="flex flex-col items-center">
              <dt className="text-sm leading-6 text-muted-foreground">Fewer lost opportunities</dt>
              <dd className="text-3xl font-bold tracking-tight text-primary">47%</dd>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="bg-secondary/50 py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-accent">Work faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Everything you need to convert leads
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-primary">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Users className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Lead Capture
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Securely collect authorized first-party data. Ensure privacy compliance from the first touchpoint.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-primary">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                    <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Rule-based Priority
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Automatically score leads using transparent rules so your sales team always knows who to call next.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-primary">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <BarChart3 className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Measure Outcomes
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Track response times, follow-up queues, and conversion outcomes rather than just vanity traffic metrics.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}