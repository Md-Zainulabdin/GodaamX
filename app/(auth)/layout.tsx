import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="bg-zinc-50 flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative">
      {/* Back Button */}
      <div className="absolute top-8 left-8">
        <Button variant="ghost" asChild className="text-zinc-500 hover:text-black">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft className="size-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-semibold tracking-tight">GodaamX</span>
        </div>
        {children}
      </div>
    </div>
  );
}
