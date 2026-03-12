"use client";

import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SIDEBAR_ITEMS } from "@/constants/constants";

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-0 p-4 pb-4">
        {/* Workspace Selector */}
        <Link
          href="/dashboard"
          className="group flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 transition-colors hover:bg-zinc-50"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex size-6 items-center justify-center rounded bg-zinc-900 text-[10px] font-bold text-white">
              O
            </div>
            <span className="text-sm font-semibold text-zinc-900">Anonymous</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-0 overflow-y-auto px-2">
        {/* Main Menu */}
        <section className="space-y-1">
          <h3 className="mb-2 px-3 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Main Menu</h3>
          <nav className="space-y-0.5">
            {SIDEBAR_ITEMS.map((item) => {
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
                    <Icon
                      size={16}
                      className={cn(
                        "shrink-0 transition-colors",
                        active ? "text-zinc-900" : "text-zinc-400 group-hover:text-zinc-600",
                      )}
                    />
                    {item.label}
                  </div>
                  {active && <div className="size-1 shrink-0 rounded-full bg-zinc-900" />}
                </Link>
              );
            })}
          </nav>
        </section>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
