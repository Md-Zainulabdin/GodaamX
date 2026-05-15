"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function FormSkeleton({ fieldCount = 4 }: { fieldCount?: number }) {
  return (
    <div className="w-full max-w-md space-y-6">
      {Array.from({ length: fieldCount }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ))}
      <div className="pt-2">
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  );
}
