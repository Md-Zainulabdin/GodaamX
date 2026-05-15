import { ColumnDef } from "@tanstack/react-table";
import { statusBadge } from "@/components/ui/status-badge";
import { DataTableActions } from "@/components/tables/data-table-actions";
import { formatDate, formatCurrency } from "@/lib/utils";
import { 
  User, 
  Supplier, 
  Category, 
  Product, 
  Warehouse, 
  Inventory, 
  PurchaseOrder, 
  PurchaseOrderItem,
  Invoice, 
  InvoiceItem,
  Customer, 
  Shipment, 
  RegistrationRequest 
} from "@/types/global";

/* =========================================================
   TABLE COLUMN TYPE
   ========================================================= */

export type TableColumn<TData> = ColumnDef<TData>;

type ActionsColumnOptions<TData> = {
  basePath: string;
  idKey: keyof TData;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  deletingId?: string;
};

/* =========================================================
   Utility Functions
   ========================================================= */

export function actionsColumn<TData>(opts: ActionsColumnOptions<TData>): TableColumn<TData> {
  return {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = String(row.original[opts.idKey]);
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

export const dateCell = <TData,>(): ColumnDef<TData>["cell"] => ({ getValue }) => {
  const raw = getValue() as string | undefined;
  return formatDate(raw);
};

export const currencyCell = <TData,>(): ColumnDef<TData>["cell"] => ({ getValue }) => {
  const raw = getValue() as number | string | undefined;
  return formatCurrency(raw);
};

/* =========================================================
   USERS TABLE
   ========================================================= */

export const USER_COLUMNS: TableColumn<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone_number", header: "Phone" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "is_active", header: "Status", cell: statusBadge },
  { accessorKey: "created_at", header: "Created At", cell: dateCell<User>() },
];

/* =========================================================
   SUPPLIERS TABLE
   ========================================================= */

export const SUPPLIER_COLUMNS: TableColumn<Supplier>[] = [
  { accessorKey: "supplier_name", header: "Supplier Name" },
  { accessorKey: "contact_email", header: "Email" },
  { accessorKey: "contact_phone", header: "Phone" },
  { accessorKey: "address", header: "Address" },
  { accessorKey: "status", header: "Status", cell: statusBadge },
  { accessorKey: "created_at", header: "Created At", cell: dateCell<Supplier>() },
];

/* =========================================================
   CATEGORIES TABLE
   ========================================================= */

export const CATEGORY_COLUMNS: TableColumn<Category>[] = [
  { accessorKey: "category_name", header: "Category Name" },
  { accessorKey: "description", header: "Description" },
  { 
    id: "parent_category_name",
    header: "Parent Category",
    cell: ({ row }) => row.original.parent_category?.category_name || "—"
  },
  { accessorKey: "created_at", header: "Created At", cell: dateCell<Category>() },
];

/* =========================================================
   PRODUCTS TABLE
   ========================================================= */

export const PRODUCT_COLUMNS: TableColumn<Product>[] = [
  { accessorKey: "product_name", header: "Product Name" },
  { accessorKey: "sku", header: "SKU" },
  { 
    id: "category_name",
    header: "Category",
    cell: ({ row }) => row.original.category?.category_name || "—"
  },
  { 
    id: "supplier_name",
    header: "Supplier",
    cell: ({ row }) => row.original.supplier?.supplier_name || "—"
  },
  { accessorKey: "price", header: "Price", cell: currencyCell<Product>() },
  { accessorKey: "cost_price", header: "Cost Price", cell: currencyCell<Product>() },
  { accessorKey: "weight", header: "Weight" },
  { accessorKey: "status", header: "Status", cell: statusBadge },
];

/* =========================================================
   WAREHOUSES TABLE
   ========================================================= */

export const WAREHOUSE_COLUMNS: TableColumn<Warehouse>[] = [
  { accessorKey: "warehouse_name", header: "Warehouse Name" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "capacity", header: "Capacity" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "is_active", header: "Status", cell: statusBadge },
  { accessorKey: "created_at", header: "Created At", cell: dateCell<Warehouse>() },
];

/* =========================================================
   INVENTORY TABLE
   ========================================================= */

export const INVENTORY_COLUMNS: TableColumn<Inventory>[] = [
  { 
    id: "product_name",
    header: "Product",
    cell: ({ row }) => row.original.product?.product_name || "—"
  },
  { 
    id: "warehouse_name",
    header: "Warehouse",
    cell: ({ row }) => row.original.warehouse?.warehouse_name || "—"
  },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "reorder_level", header: "Reorder Level" },
  { accessorKey: "last_restocked", header: "Last Restocked", cell: dateCell<Inventory>() },
];

/* =========================================================
   PURCHASE ORDERS TABLE
   ========================================================= */

export const PURCHASE_ORDER_COLUMNS: TableColumn<PurchaseOrder>[] = [
  { accessorKey: "order_number", header: "Order Number" },
  { 
    id: "supplier_name",
    header: "Supplier",
    cell: ({ row }) => row.original.supplier?.supplier_name || "—"
  },
  { 
    id: "warehouse_name",
    header: "Warehouse",
    cell: ({ row }) => row.original.warehouse?.warehouse_name || "—"
  }, 
  { accessorKey: "order_date", header: "Order Date", cell: dateCell<PurchaseOrder>() },
  { accessorKey: "expected_delivery", header: "Expected Delivery", cell: dateCell<PurchaseOrder>() },
  { accessorKey: "total_amount", header: "Total Amount", cell: currencyCell<PurchaseOrder>() },
  { accessorKey: "status", header: "Status", cell: statusBadge },
];

/* =========================================================
   PURCHASE ORDER ITEMS TABLE
   ========================================================= */

export const PURCHASE_ORDER_ITEM_COLUMNS: TableColumn<PurchaseOrderItem>[] = [
  { 
    id: "order_number",
    header: "Order Number",
    cell: ({ row }) => row.original.purchase_order?.order_number || "—"
  },
  { 
    id: "product_name",
    header: "Product",
    cell: ({ row }) => row.original.product?.product_name || "—"
  },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "price", header: "Price", cell: currencyCell<PurchaseOrderItem>() },
];

/* =========================================================
   INVOICE TABLE
   ========================================================= */

export const INVOICE_COLUMNS: TableColumn<Invoice>[] = [
  { accessorKey: "invoice_number", header: "Invoice Number" },
  { 
    id: "supplier_name",
    header: "Supplier",
    cell: ({ row }) => row.original.supplier?.supplier_name || "—"
  },
  { 
    id: "order_number",
    header: "Purchase Order",
    cell: ({ row }) => row.original.purchase_order?.order_number || "—"
  },
  { accessorKey: "invoice_date", header: "Invoice Date", cell: dateCell<Invoice>() },
  { accessorKey: "total_amount", header: "Total Amount", cell: currencyCell<Invoice>() },
  { accessorKey: "status", header: "Status", cell: statusBadge },
];

/* =========================================================
   INVOICE ITEMS TABLE
   ========================================================= */

export const INVOICE_ITEM_COLUMNS: TableColumn<InvoiceItem>[] = [
  { 
    id: "invoice_number",
    header: "Invoice Number",
    cell: ({ row }) => row.original.invoice?.invoice_number || "—"
  },
  { 
    id: "product_name",
    header: "Product",
    cell: ({ row }) => row.original.product?.product_name || "—"
  },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "price", header: "Price", cell: currencyCell<InvoiceItem>() },
];

/* =========================================================
   CUSTOMERS TABLE
   ========================================================= */

export const CUSTOMER_COLUMNS: TableColumn<Customer>[] = [
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

export const SHIPMENT_COLUMNS: TableColumn<Shipment>[] = [
  { 
    id: "order_number",
    header: "Purchase Order",
    cell: ({ row }) => row.original.purchase_order?.order_number || "—"
  },
  { 
    id: "warehouse_name",
    header: "Warehouse",
    cell: ({ row }) => row.original.warehouse?.warehouse_name || "—"
  },
  { accessorKey: "carrier_name", header: "Carrier" },
  { accessorKey: "tracking_number", header: "Tracking Number" },
  { accessorKey: "shipment_date", header: "Shipment Date", cell: dateCell<Shipment>() },
  { accessorKey: "estimated_arrival", header: "Estimated Arrival", cell: dateCell<Shipment>() },
  { accessorKey: "actual_arrival", header: "Actual Arrival", cell: dateCell<Shipment>() },
  { accessorKey: "status", header: "Status", cell: statusBadge },
];

/* =========================================================
   REGISTRATION REQUESTS TABLE
   ========================================================= */

export const REGISTRATION_REQUEST_COLUMNS: TableColumn<RegistrationRequest>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "company_name", header: "Company Name" },
  { accessorKey: "message", header: "Message" },
  { accessorKey: "status", header: "Status", cell: statusBadge },
  { accessorKey: "created_at", header: "Submitted At", cell: dateCell<RegistrationRequest>() },
];
