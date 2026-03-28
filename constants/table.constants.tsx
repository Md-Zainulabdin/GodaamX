import { statusBadge } from "@/components/ui/status-badge";
import { DataTableActions } from "@/components/tables/data-table-actions";
import { ColumnDef } from "@tanstack/react-table";

/* =========================================================
   TABLE COLUMN TYPE
   ========================================================= */

export type TableColumn<TData = any> = {
  accessorKey: string;
  header: string;
  cell?: ColumnDef<TData>["cell"];
};

type ActionsColumnOptions = {
  basePath: string;
  idKey: string;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
};

/* =========================================================
   Utility Functions
   ========================================================= */

export function actionsColumn<TData>(opts: ActionsColumnOptions): TableColumn<TData> {
  return {
    accessorKey: "__actions",
    header: "Actions",
    cell: ({ row }) => (
      <DataTableActions
        id={row.original[opts.idKey as keyof TData] as string}
        editPath={`${opts.basePath}/${row.original[opts.idKey as keyof TData]}`}
        onDelete={opts.onDelete}
        isDeleting={opts.isDeleting}
      />
    ),
  };
}

const dateCell: ColumnDef<any>["cell"] = ({ getValue }) => {
  const raw = getValue<string>();
  if (!raw) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(raw));
};

/* =========================================================
   USERS TABLE
   ========================================================= */

export const USER_COLUMNS: TableColumn[] = [
  // { accessorKey: "user_id", header: "User ID" },
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
  // { accessorKey: "supplier_id", header: "Supplier ID" },
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
  // { accessorKey: "category_id", header: "Category ID" },
  { accessorKey: "category_name", header: "Category Name" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "parent_category_name", header: "Parent Category" },
  { accessorKey: "created_at", header: "Created At", cell: dateCell },
];

/* =========================================================
   PRODUCTS TABLE
   ========================================================= */

export const PRODUCT_COLUMNS: TableColumn[] = [
  // { accessorKey: "product_id", header: "Product ID" },
  { accessorKey: "product_name", header: "Product Name" },
  { accessorKey: "sku", header: "SKU" },
  { accessorKey: "category_id", header: "Category" },
  { accessorKey: "supplier_id", header: "Supplier" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "cost_price", header: "Cost Price" },
  { accessorKey: "weight", header: "Weight" },
  { accessorKey: "status", header: "Status", cell: statusBadge },
];

/* =========================================================
   WAREHOUSES TABLE
   ========================================================= */

export const WAREHOUSE_COLUMNS: TableColumn[] = [
  { accessorKey: "warehouse_id", header: "Warehouse ID" },
  { accessorKey: "warehouse_name", header: "Warehouse Name" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "capacity", header: "Capacity" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "manager_id", header: "Manager" },
];

/* =========================================================
   INVENTORY TABLE
   ========================================================= */

export const INVENTORY_COLUMNS: TableColumn[] = [
  { accessorKey: "inventory_id", header: "Inventory ID" },
  { accessorKey: "product_id", header: "Product" },
  { accessorKey: "warehouse_id", header: "Warehouse" },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "reorder_level", header: "Reorder Level" },
  { accessorKey: "last_restocked", header: "Last Restocked" },
];

/* =========================================================
   PURCHASE ORDERS TABLE
   ========================================================= */

export const PURCHASE_ORDER_COLUMNS: TableColumn[] = [
  { accessorKey: "po_id", header: "PO ID" },
  { accessorKey: "order_number", header: "Order Number" },
  { accessorKey: "supplier_id", header: "Supplier" },
  { accessorKey: "warehouse_id", header: "Warehouse" },
  { accessorKey: "order_date", header: "Order Date" },
  { accessorKey: "expected_delivery", header: "Expected Delivery" },
  { accessorKey: "total_amount", header: "Total Amount" },
  { accessorKey: "status", header: "Status", cell: statusBadge },
];

/* =========================================================
   PURCHASE ORDER ITEMS TABLE
   ========================================================= */

export const PURCHASE_ORDER_ITEM_COLUMNS: TableColumn[] = [
  { accessorKey: "po_item_id", header: "PO Item ID" },
  { accessorKey: "po_id", header: "Purchase Order" },
  { accessorKey: "product_id", header: "Product" },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "price", header: "Price" },
];

/* =========================================================
   INVOICE TABLE
   ========================================================= */

export const INVOICE_COLUMNS: TableColumn[] = [
  { accessorKey: "invoice_id", header: "Invoice ID" },
  { accessorKey: "invoice_number", header: "Invoice Number" },
  { accessorKey: "supplier_id", header: "Supplier" },
  { accessorKey: "po_id", header: "Purchase Order" },
  { accessorKey: "invoice_date", header: "Invoice Date" },
  { accessorKey: "total_amount", header: "Total Amount" },
  { accessorKey: "status", header: "Status", cell: statusBadge },
];

/* =========================================================
   INVOICE ITEMS TABLE
   ========================================================= */

export const INVOICE_ITEM_COLUMNS: TableColumn[] = [
  { accessorKey: "invoice_item_id", header: "Invoice Item ID" },
  { accessorKey: "invoice_id", header: "Invoice" },
  { accessorKey: "product_id", header: "Product" },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "price", header: "Price" },
];

/* =========================================================
   CUSTOMERS TABLE
   ========================================================= */

export const CUSTOMER_COLUMNS: TableColumn[] = [
  { accessorKey: "customer_id", header: "Customer ID" },
  { accessorKey: "customer_name", header: "Customer Name" },
  { accessorKey: "contact_person", header: "Contact Person" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "address", header: "Address" },
  { accessorKey: "customer_type", header: "Customer Type" },
];

/* =========================================================
   SHIPMENTS TABLE
   ========================================================= */

export const SHIPMENT_COLUMNS: TableColumn[] = [
  { accessorKey: "shipment_id", header: "Shipment ID" },
  { accessorKey: "po_id", header: "Purchase Order" },
  { accessorKey: "warehouse_id", header: "Warehouse" },
  { accessorKey: "carrier_name", header: "Carrier" },
  { accessorKey: "tracking_number", header: "Tracking Number" },
  { accessorKey: "shipment_date", header: "Shipment Date" },
  { accessorKey: "estimated_arrival", header: "Estimated Arrival" },
  { accessorKey: "actual_arrival", header: "Actual Arrival" },
  { accessorKey: "status", header: "Status", cell: statusBadge },
];
