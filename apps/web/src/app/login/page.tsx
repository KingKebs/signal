"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-accent" />
            <span className="text-3xl font-bold tracking-tight text-primary">Signal</span>
          </Link>
        </div>
        
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-primary">Welcome back</CardTitle>
            <CardDescription>
              Enter your email and password to log in to your account.
              <br/>
              <span className="text-accent text-xs mt-2 block">(Authentication is deferred to Phase 5)</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jane@company.com" disabled />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-sm font-medium text-accent hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" disabled />
              </div>
              <Button type="button" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled>
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don&apos;t have an account? </span>
              <Link href="/contact" className="font-medium text-accent hover:underline">
                Request a demo
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
