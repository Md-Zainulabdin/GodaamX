/* =========================================================
   UI Constants
   Sidebar + Page Titles
   ========================================================= */

import { LayoutDashboard, Users, Truck, Package, Boxes, Warehouse, ShoppingCart, FileText, User } from "lucide-react";

/* =========================================================
   APP META DATA
   ========================================================= */

export const APP_TITLE = "GodaamX — Inventory & Logistic ERP System";
export const APP_DESCRIPTION =
  "Enterprise Resource Planning (ERP) system designed for inventory management and logistics operations";

/* =========================================================
   SIDEBAR
   ========================================================= */

export const SIDEBAR_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    id: "suppliers",
    label: "Suppliers",
    href: "/suppliers",
    icon: Truck,
  },

  {
    id: "users",
    label: "Users",
    href: "/users",
    icon: Users,
  },

  {
    id: "categories",
    label: "Categories",
    href: "/categories",
    icon: Boxes,
  },

  {
    id: "products",
    label: "Products",
    href: "/products",
    icon: Package,
  },

  {
    id: "warehouses",
    label: "Warehouses",
    href: "/warehouses",
    icon: Warehouse,
  },

  {
    id: "inventory",
    label: "Inventory",
    href: "/inventory",
    icon: Boxes,
  },

  {
    id: "purchase_orders",
    label: "Purchase Orders",
    href: "/purchase-orders",
    icon: ShoppingCart,
  },

  {
    id: "invoices",
    label: "Invoices",
    href: "/invoices",
    icon: FileText,
  },

  {
    id: "customers",
    label: "Customers",
    href: "/customers",
    icon: User,
  },

  {
    id: "shipments",
    label: "Shipments",
    href: "/shipments",
    icon: Truck,
  },
];

/* =========================================================
   PAGE TITLES
   ========================================================= */

export const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/suppliers": "Suppliers",
  "/users": "Users",
  "/categories": "Categories",
  "/products": "Products",
  "/warehouses": "Warehouses",
  "/inventory": "Inventory",
  "/purchase-orders": "Purchase Orders",
  "/invoices": "Invoices",
  "/customers": "Customers",
  "/shipments": "Shipments",
};
