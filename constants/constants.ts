/* =========================================================
   UI Constants
   Sidebar + Page Titles
   ========================================================= */

import { LayoutDashboard, Users, Truck, Package, Boxes, Warehouse, ShoppingCart, FileText, User, CheckSquare } from "lucide-react";

/* =========================================================
   APP META DATA
   ========================================================= */

export const APP_TITLE = "GodaamX — Inventory & Logistic ERP System";
export const APP_DESCRIPTION =
  "Enterprise Resource Planning (ERP) system designed for inventory management and logistics operations";

/* =========================================================
   SIDEBAR
   ========================================================= */

export type SidebarItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  roles?: string[]; // If empty, visible to all users
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    // No roles = visible to all
  },

  {
    id: "registration_requests",
    label: "Registration Requests",
    href: "/registration-requests",
    icon: CheckSquare,
    roles: ["SUPERADMIN"],
  },

  {
    id: "users",
    label: "Users",
    href: "/users",
    icon: Users,
    roles: ["SUPERADMIN"],
  },

  {
    id: "suppliers",
    label: "Suppliers",
    href: "/suppliers",
    icon: Truck,
    roles: ["SUPPLIER"],
  },

  {
    id: "categories",
    label: "Categories",
    href: "/categories",
    icon: Boxes,
    roles: ["SUPPLIER"],
  },

  {
    id: "products",
    label: "Products",
    href: "/products",
    icon: Package,
    roles: ["SUPPLIER"],
  },

  {
    id: "warehouses",
    label: "Warehouses",
    href: "/warehouses",
    icon: Warehouse,
    roles: ["SUPPLIER"],
  },

  {
    id: "inventory",
    label: "Inventory",
    href: "/inventory",
    icon: Boxes,
    roles: ["SUPPLIER"],
  },

  {
    id: "purchase_orders",
    label: "Purchase Orders",
    href: "/purchase-orders",
    icon: ShoppingCart,
    roles: ["SUPPLIER"],
  },

  {
    id: "purchase_order_items",
    label: "Purchase Order Items",
    href: "/purchase-order-items",
    icon: ShoppingCart,
    roles: ["SUPPLIER"],
  },

  {
    id: "invoices",
    label: "Invoices",
    href: "/invoices",
    icon: FileText,
    roles: ["SUPPLIER"],
  },

  {
    id: "invoice_items",
    label: "Invoice Items",
    href: "/invoice-items",
    icon: FileText,
    roles: ["SUPPLIER"],
  },

  {
    id: "customers",
    label: "Customers",
    href: "/customers",
    icon: User,
    roles: ["SUPPLIER"],
  },

  {
    id: "shipments",
    label: "Shipments",
    href: "/shipments",
    icon: Truck,
    roles: ["SUPPLIER"],
  },
];

/* =========================================================
   PAGE TITLES
   ========================================================= */

export const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/registration-requests": "Registration Requests",
  "/suppliers": "Suppliers",
  "/users": "Users",
  "/categories": "Categories",
  "/products": "Products",
  "/warehouses": "Warehouses",
  "/inventory": "Inventory",
  "/purchase-orders": "Purchase Orders",
  "/purchase-order-items": "Purchase Order Items",
  "/invoices": "Invoices",
  "/invoice-items": "Invoice Items",
  "/customers": "Customers",
  "/shipments": "Shipments",
};
