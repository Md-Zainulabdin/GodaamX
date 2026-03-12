import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 p-4 lg:px-6">{children}</div>
      </div>
    </SidebarProvider>
  );
}
