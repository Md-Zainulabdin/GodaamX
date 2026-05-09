"use client";

import { useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { DashboardCard } from "./_components/dashboard-card";
import { DashboardLineChart } from "./_components/dashboard-line-chart";
import { DashboardBarChart } from "./_components/dashboard-bar-chart";
import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  Clock,
  Package
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import { useDashboard } from "./_hook/use-dashboard";

const formatCurrency = (value: number | string | undefined) => {
  if (value === undefined) return "—";
  const num = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
};

export default function Dashboard() {
  const { session, logout, loading: authLoading } = useAuth();
  const { data: dashboardData, isLoading: dashboardLoading, error } = useDashboard();

  const role = session?.user?.role as "SUPERADMIN" | "SUPPLIER";

  const isLoading = authLoading || dashboardLoading;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="col-span-2 h-[350px]" />
          <Skeleton className="h-[350px]" />
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AlertTriangle className="mb-4 size-12 text-red-500" />
        <h3 className="text-lg font-semibold text-zinc-900">Failed to load dashboard</h3>
        <p className="mt-1 text-sm text-zinc-500">
          There was an error fetching your overview data. Please try again later.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">GodaamX</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Overview</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          {role === "SUPERADMIN" ? "Executive Overview" : "Seller Central"}
        </h1>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardData?.role === "SUPERADMIN" ? (
          <>
            <DashboardCard
              title="Total Revenue"
              value={formatCurrency(dashboardData?.cards?.revenue)}
              icon={DollarSign}
              description="+12% from last month"
            />
            <DashboardCard
              title="Total Orders"
              value={dashboardData?.cards?.orders}
              icon={ShoppingCart}
              description="+8% increase"
            />
            <DashboardCard
              title="Active Suppliers"
              value={dashboardData?.cards?.suppliers}
              icon={Users}
              description="Across all regions"
            />
            <DashboardCard
              title="Low Stock"
              value={dashboardData?.cards?.low_stock}
              icon={AlertTriangle}
              className="border-red-200 bg-red-50"
              description="Items needing attention"
            />
          </>
        ) : (
          <>
            <DashboardCard
              title="My Earnings"
              value={formatCurrency(dashboardData?.cards?.revenue)}
              icon={DollarSign}
              description="Net revenue this month"
            />
            <DashboardCard
              title="My Orders"
              value={dashboardData?.cards?.orders}
              icon={Package}
              description="Total processed orders"
            />
            <DashboardCard
              title="Pending Orders"
              value={dashboardData?.cards?.pending_orders}
              icon={Clock}
              className="border-amber-200 bg-amber-50"
              description="Ready for shipment"
            />
            <DashboardCard
              title="Low Stock Products"
              value={dashboardData?.cards?.low_stock}
              icon={AlertTriangle}
              className="border-red-200 bg-red-50"
              description="Restock recommended"
            />
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dashboardData?.role === "SUPERADMIN" ? (
          <>
            <DashboardLineChart
              title="Revenue Trend"
              description="Monthly revenue growth over the current year"
              data={dashboardData?.charts?.revenue_trend}
              xKey="month"
              yKey="revenue"
              yLabel="$"
              className="lg:col-span-2"
            />
            <DashboardBarChart
              title="Order Overview"
              description="Distribution of orders by status"
              data={dashboardData?.charts?.order_status}
              xKey="status"
              yKey="count"
              className="lg:col-span-1"
            />
            <DashboardBarChart
              title="Top Suppliers"
              description="Suppliers with highest order volume"
              data={dashboardData?.charts?.top_suppliers}
              xKey="supplier"
              yKey="orders"
              colors={["#2563eb"]}
              className="lg:col-span-3"
            />
          </>
        ) : (
          <>
            <DashboardLineChart
              title="Sales Trend"
              description="Your monthly sales performance"
              data={dashboardData?.charts?.sales_trend}
              xKey="month"
              yKey="sales"
              yLabel="$"
              className="lg:col-span-2"
            />
            <DashboardBarChart
              title="Order Progress"
              description="Status of your current orders"
              data={dashboardData?.charts?.order_status}
              xKey="status"
              yKey="count"
              className="lg:col-span-1"
            />
            <DashboardBarChart
              title="Top Selling Products"
              description="Best performing products by quantity"
              data={dashboardData?.charts?.top_products}
              xKey="product"
              yKey="quantity"
              colors={["#16a34a"]}
              className="lg:col-span-3"
            />
          </>
        )}
      </div>
    </div>
  );
}
