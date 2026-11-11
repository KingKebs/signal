"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

// Form validation schema based on the "Suggested lead fields" in the spec
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  company: z.string().optional(),
  consent_granted: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the privacy policy." }),
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": "mock-tenant-1",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          source: "Contact Form",
          consent_granted: data.consent_granted,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to capture lead");
      }
      
      setSubmitStatus("success");
      reset(); // Clear the form on success
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-4">
          Request a demo
        </h1>
        <p className="text-lg text-muted-foreground">
          See how Signal can help your team capture and convert more leads. Fill out the form below and We&apos;ll be in touch shortly.
        </p>
      </div>

      <Card className="shadow-lg border-border">
        <CardHeader>
          <CardTitle>Contact our team</CardTitle>
          <CardDescription>
            All fields marked with an asterisk (*) are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitStatus === "success" && (
            <Alert className="mb-6 border-accent/50 bg-accent/10">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <AlertTitle className="text-accent">Success</AlertTitle>
              <AlertDescription className="text-primary">
                Thank you for your interest! Your request has been received, and our team will contact you shortly.
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === "error" && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was a problem submitting your request. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Jane Doe"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Work Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@company.com"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  placeholder="Acme Corp"
                  {...register("company")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register("phone")}
                />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-start space-x-3">
                <div className="flex h-5 items-center">
                  <input
                    id="consent_granted"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent accent-accent"
                    {...register("consent_granted")}
                  />
                </div>
                <div className="text-sm">
                  <Label htmlFor="consent_granted" className="font-medium text-primary">
                    Privacy Consent *
                  </Label>
                  <p className="text-muted-foreground mt-1">
                    I agree to the processing of my personal data according to the{" "}
                    <a href="#" className="underline hover:text-primary">
                      Privacy Policy
                    </a>
                    . Signal handles your data securely and never sells it to third parties.
                  </p>
                </div>
              </div>
              {errors.consent_granted && (
                <p className="text-sm font-medium text-destructive ml-7">
                  {errors.consent_granted.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
