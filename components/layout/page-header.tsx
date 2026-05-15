"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface BreadcrumbStep {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbStep[];
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, breadcrumbs, className, children }: PageHeaderProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">GodaamX</BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((step, index) => (
            <div key={index} className="flex items-center gap-2">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {step.href ? (
                  <BreadcrumbLink href={step.href}>{step.label}</BreadcrumbLink>
                ) : (
                  <span className="text-zinc-900 font-medium">{step.label}</span>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex w-full items-center justify-between gap-4 my-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">{title}</h1>
        <div className="flex items-center gap-3">{children}</div>
      </div>
    </div>
  );
}
