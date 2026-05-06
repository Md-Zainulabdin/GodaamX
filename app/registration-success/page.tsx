"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function RegistrationSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50/50 px-6">
      <Card className="w-full max-w-md border-zinc-200 shadow-xl">
        <CardContent className="flex flex-col items-center pt-10 text-center">
          <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-green-50 text-green-600">
            <CheckCircle2 className="size-10" />
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Application Submitted!</h1>
          
          <div className="mt-4 space-y-4">
            <p className="text-zinc-600">
              Thank you for registering with <span className="font-semibold text-black">GodaamX</span>. 
              Our team will review your application shortly.
            </p>
            <p className="text-sm text-zinc-500">
              Once approved, you will receive a notification via email with instructions on how to access your dashboard.
            </p>
          </div>

          <div className="mt-10 w-full">
            <Button asChild variant="outline" className="w-full border-zinc-200 text-zinc-600 hover:bg-zinc-50">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Support text */}
      <p className="mt-8 text-sm text-zinc-500">
        Have questions? <a href="mailto:support@godaamx.com" className="text-black underline underline-offset-4 decoration-zinc-300">Contact our support team</a>
      </p>
    </div>
  );
}
