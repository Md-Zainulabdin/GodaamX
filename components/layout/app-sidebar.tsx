"use client";

import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SIDEBAR_ITEMS } from "@/constants/constants";
import { useAuth } from "@/hooks/use-auth";
import { Sparkles } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const { session } = useAuth();
  const userRole = session?.user?.role;

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const visibleItems = SIDEBAR_ITEMS.filter((item) => {
    if (!item.roles || item.roles.length === 0) {
      return true;
    }
    return userRole && item.roles.includes(userRole);
  });

  return (
    <Sidebar>
      <SidebarHeader className="border-0 p-4 pb-4">
        {/* Workspace Selector */}
        <Link
          href="/dashboard"
          className="group flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 transition-colors hover:bg-zinc-50"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xl font-semibold tracking-tight">GodaamX</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-0 overflow-y-auto px-2">
        {/* Main Menu */}
        <section className="space-y-1">
          <h3 className="mb-2 px-3 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Main Menu</h3>
          <nav className="space-y-2">
            {visibleItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "group flex w-full items-center justify-between rounded-md px-3 py-1.5 text-[13px] font-medium transition-all duration-150",
                    active ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900",
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={"shrink-0 transition-colors"} />
                    {item.label}
                  </div>
                  {active && <div className="size-1 shrink-0 rounded-full bg-zinc-900" />}
                </Link>
              );
            })}
          </nav>
        </section>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Link
          href="/chat"
          className={cn(
            "group flex w-full items-center justify-center gap-2.5 rounded-lg bg-linear-to-br from-zinc-900 to-zinc-700 px-4 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
            pathname === "/chat" && "ring-2 ring-zinc-900 ring-offset-2"
          )}
        >
          <Sparkles size={18} className="text-zinc-400 group-hover:text-white" />
          <span>Ask Agent</span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
