import { statusBadge } from "@/components/ui/status-badge";
import { DataTableActions } from "@/components/tables/data-table-actions";
import { ColumnDef } from "@tanstack/react-table";

/* =========================================================
   TABLE COLUMN TYPE
   ========================================================= */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableColumn<TData = any> = {
  id?: string;
  accessorKey: string;
  header: string;
  cell?: ColumnDef<TData>["cell"];
};

type ActionsColumnOptions = {
  basePath: string;
  idKey: string;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  deletingId?: string;
};

/* =========================================================
   Utility Functions
   ========================================================= */

export function actionsColumn<TData>(opts: ActionsColumnOptions): TableColumn<TData> {
  return {
    accessorKey: "__actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original[opts.idKey as keyof TData] as string;
      return (
        <DataTableActions
          id={id}
          editPath={`${opts.basePath}/${id}`}
          onDelete={opts.onDelete}
          isDeleting={opts.isDeleting && opts.deletingId === id}
        />
      );
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dateCell: ColumnDef<any>["cell"] = ({ getValue }) => {
  const raw = getValue<string>();
  if (!raw) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(raw));
  } catch {
    return "—";
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const currencyCell: ColumnDef<any>["cell"] = ({ getValue }) => {
  const raw = getValue<number | string>();
  if (raw == null || raw === "") return "—";
  const num = typeof raw === "string" ? parseFloat(raw) : raw;
  if (isNaN(num)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(num);
};

/* =========================================================
   USERS TABLE
   ========================================================= */

export const USER_COLUMNS: TableColumn[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone_number", header: "Phone" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "is_active", header: "Status", cell: statusBadge },
  { accessorKey: "created_at", header: "Created At", cell: dateCell },
];

/* =========================================================
   SUPPLIERS TABLE
   ========================================================= */

export const SUPPLIER_COLUMNS: TableColumn[] = [
  { accessorKey: "supplier_name", header: "Supplier Name" },
  { accessorKey: "contact_email", header: "Email" },
  { accessorKey: "contact_phone", header: "Phone" },
  { accessorKey: "address", header: "Address" },
  { accessorKey: "status", header: "Status", cell: statusBadge },
  { accessorKey: "created_at", header: "Created At", cell: dateCell },
];

/* =========================================================
   CATEGORIES TABLE
   ========================================================= */

export const CATEGORY_COLUMNS: TableColumn[] = [
  { accessorKey: "category_name", header: "Category Name" },
  { accessorKey: "description", header: "Description" },
  { 
    id: "parent_category.category_name",
    accessorKey: "parent_category.category_name", 
    header: "Parent Category",
    cell: ({ row }) => row.original.parent_category?.category_name || "—"
  },
  { accessorKey: "created_at", header: "Created At", cell: dateCell },
];

/* =========================================================
   PRODUCTS TABLE
   ========================================================= */

export const PRODUCT_COLUMNS: TableColumn[] = [
  { accessorKey: "product_name", header: "Product Name" },
  { accessorKey: "sku", header: "SKU" },
  { 
    id: "category.category_name",
    accessorKey: "category.category_name", 
    header: "Category",
    cell: ({ row }) => row.original.category?.category_name || "—"
  },
  { 
    id: "supplier.supplier_name",
    accessorKey: "supplier.supplier_name", 
    header: "Supplier",
    cell: ({ row }) => row.original.supplier?.supplier_name || "—"
  },
  { accessorKey: "price", header: "Price", cell: currencyCell },
  { accessorKey: "cost_price", header: "Cost Price", cell: currencyCell },
  { accessorKey: "weight", header: "Weight" },
  { accessorKey: "status", header: "Status", cell: statusBadge },
];

/* =========================================================
   WAREHOUSES TABLE
   ========================================================= */

export const WAREHOUSE_COLUMNS: TableColumn[] = [
  { accessorKey: "warehouse_name", header: "Warehouse Name" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "capacity", header: "Capacity" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "is_active", header: "Status", cell: statusBadge },
  { accessorKey: "created_at", header: "Created At", cell: dateCell },
];

/* =========================================================
   INVENTORY TABLE
   ========================================================= */

export const INVENTORY_COLUMNS: TableColumn[] = [
  { 
    id: "product.product_name",
    accessorKey: "product.product_name", 
    header: "Product",
    cell: ({ row }) => row.original.product?.product_name || "—"
  },
  { 
    id: "warehouse.warehouse_name",
    accessorKey: "warehouse.warehouse_name", 
    header: "Warehouse",
    cell: ({ row }) => row.original.warehouse?.warehouse_name || "—"
  },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "reorder_level", header: "Reorder Level" },
  { accessorKey: "last_restocked", header: "Last Restocked", cell: dateCell },
];

/* =========================================================
   PURCHASE ORDERS TABLE
   ========================================================= */

export const PURCHASE_ORDER_COLUMNS: TableColumn[] = [
  { accessorKey: "order_number", header: "Order Number" },
  { 
    id: "supplier.supplier_name",
    accessorKey: "supplier.supplier_name", 
    header: "Supplier",
    cell: ({ row }) => row.original.supplier?.supplier_name || "—"
  },
  { 
    id: "warehouse.warehouse_name",
    accessorKey: "warehouse.warehouse_name", 
    header: "Warehouse",
    cell: ({ row }) => row.original.warehouse?.warehouse_name || "—"
  }, 
  { accessorKey: "order_date", header: "Order Date", cell: dateCell },
  { accessorKey: "expected_delivery", header: "Expected Delivery", cell: dateCell },
  { accessorKey: "total_amount", header: "Total Amount", cell: currencyCell },
  { accessorKey: "status", header: "Status", cell: statusBadge },
];

/* =========================================================
   PURCHASE ORDER ITEMS TABLE
   ========================================================= */

export const PURCHASE_ORDER_ITEM_COLUMNS: TableColumn[] = [
  { 
    id: "purchase_order.order_number",
    accessorKey: "purchase_order.order_number", 
    header: "Order Number",
    cell: ({ row }) => row.original.purchase_order?.order_number || "—"
  },
  { 
    accessorKey: "product.product_name", 
    header: "Product",
    id: "product.product_name",
    cell: ({ row }) => row.original.product?.product_name || "—"
  },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "price", header: "Price", cell: currencyCell },
];

/* =========================================================
   INVOICE TABLE
   ========================================================= */

export const INVOICE_COLUMNS: TableColumn[] = [
  { accessorKey: "invoice_number", header: "Invoice Number" },
  { 
    id: "supplier.supplier_name",
    accessorKey: "supplier.supplier_name", 
    header: "Supplier",
    cell: ({ row }) => row.original.supplier?.supplier_name || "—"
  },
  { 
    id: "purchase_order.order_number",
    accessorKey: "purchase_order.order_number", 
    header: "Purchase Order",
    cell: ({ row }) => row.original.purchase_order?.order_number || "—"
  },
  { accessorKey: "invoice_date", header: "Invoice Date", cell: dateCell },
  { accessorKey: "total_amount", header: "Total Amount", cell: currencyCell },
  { accessorKey: "status", header: "Status", cell: statusBadge },
];

/* =========================================================
   INVOICE ITEMS TABLE
   ========================================================= */

export const INVOICE_ITEM_COLUMNS: TableColumn[] = [
  { 
    accessorKey: "invoice.invoice_number", 
    header: "Invoice Number",
    cell: ({ row }) => row.original.invoice?.invoice_number || "—"
  },
  { 
    id: "product.product_name",
    accessorKey: "product.product_name", 
    header: "Product",
    cell: ({ row }) => row.original.product?.product_name || "—"
  },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "price", header: "Price", cell: currencyCell },
];

/* =========================================================
   CUSTOMERS TABLE
   ========================================================= */

export const CUSTOMER_COLUMNS: TableColumn[] = [
  { accessorKey: "customer_name", header: "Customer Name" },
  { accessorKey: "contact_person", header: "Contact Person" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "address", header: "Address" },
  { accessorKey: "customer_type", header: "Customer Type", cell: statusBadge },
];

/* =========================================================
   SHIPMENTS TABLE
   ========================================================= */

export const SHIPMENT_COLUMNS: TableColumn[] = [
  { 
    id: "purchase_order.order_number",
    accessorKey: "purchase_order.order_number", 
    header: "Purchase Order",
    cell: ({ row }) => row.original.purchase_order?.order_number || "—"
  },
  { 
    id: "warehouse.warehouse_name",
    accessorKey: "warehouse.warehouse_name", 
    header: "Warehouse",
    cell: ({ row }) => row.original.warehouse?.warehouse_name || "—"
  },
  { accessorKey: "carrier_name", header: "Carrier" },
  { accessorKey: "tracking_number", header: "Tracking Number" },
  { accessorKey: "shipment_date", header: "Shipment Date", cell: dateCell },
  { accessorKey: "estimated_arrival", header: "Estimated Arrival", cell: dateCell },
  { accessorKey: "actual_arrival", header: "Actual Arrival", cell: dateCell },
  { accessorKey: "status", header: "Status", cell: statusBadge },
];

/* =========================================================
   REGISTRATION REQUESTS TABLE
   ========================================================= */

export const REGISTRATION_REQUEST_COLUMNS: TableColumn[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "company_name", header: "Company Name" },
  { accessorKey: "message", header: "Message" },
  { accessorKey: "status", header: "Status", cell: statusBadge },
  { accessorKey: "created_at", header: "Submitted At", cell: dateCell },
];
