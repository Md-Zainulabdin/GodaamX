import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <h1 className="text-9xl font-black text-zinc-100 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold tracking-tight text-zinc-900">Oops! Page not found</span>
          </div>
        </div>
        
        <p className="max-w-md text-zinc-500">
          The page you are looking for might have been moved, deleted, or possibly never existed.
        </p>

        <Button asChild size="lg" className="mt-4 bg-black text-white hover:bg-zinc-800">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
