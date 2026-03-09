/* =========================================================
   UI Constants
   Sidebar + Page Titles
   ========================================================= */

import { LayoutDashboard, Users, Truck, Package, Boxes, Warehouse, ShoppingCart, FileText, User } from "lucide-react";

/* =========================================================
   APP META DATA
   ========================================================= */

export const APP_TITLE = "Inventory & Logistic ERP System";
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
    href: "/dashboard/suppliers",
    icon: Truck,
  },

  {
    id: "users",
    label: "Users",
    href: "/dashboard/users",
    icon: Users,
  },

  {
    id: "categories",
    label: "Categories",
    href: "/dashboard/categories",
    icon: Boxes,
  },

  {
    id: "products",
    label: "Products",
    href: "/dashboard/products",
    icon: Package,
  },

  {
    id: "warehouses",
    label: "Warehouses",
    href: "/dashboard/warehouses",
    icon: Warehouse,
  },

  {
    id: "inventory",
    label: "Inventory",
    href: "/dashboard/inventory",
    icon: Boxes,
  },

  {
    id: "purchase_orders",
    label: "Purchase Orders",
    href: "/dashboard/purchase-orders",
    icon: ShoppingCart,
  },

  {
    id: "invoices",
    label: "Invoices",
    href: "/dashboard/invoices",
    icon: FileText,
  },

  {
    id: "customers",
    label: "Customers",
    href: "/dashboard/customers",
    icon: User,
  },

  {
    id: "shipments",
    label: "Shipments",
    href: "/dashboard/shipments",
    icon: Truck,
  },
];

/* =========================================================
   PAGE TITLES
   ========================================================= */

export const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/suppliers": "Suppliers",
  "/dashboard/users": "Users",
  "/dashboard/categories": "Categories",
  "/dashboard/products": "Products",
  "/dashboard/warehouses": "Warehouses",
  "/dashboard/inventory": "Inventory",
  "/dashboard/purchase-orders": "Purchase Orders",
  "/dashboard/invoices": "Invoices",
  "/dashboard/customers": "Customers",
  "/dashboard/shipments": "Shipments",
};
