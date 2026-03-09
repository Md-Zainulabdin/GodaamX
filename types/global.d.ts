/* =========================================================
   GLOBAL TYPES
   ========================================================= */

export type UUID = string;
export type Timestamp = string;

export type BaseEntity = {
  created_at: Timestamp;
  updated_at: Timestamp;
  created_by: UUID | null;
  updated_by: UUID | null;
  deleted: boolean;
};

/* =========================================================
   ENUMS
   ========================================================= */

export type UserRole =
  | "SUPERADMIN"
  | "WAREHOUSE_MANAGER"
  | "SUPPLIER";

export type Status = "ACTIVE" | "INACTIVE";

export type PurchaseOrderStatus =
  | "DRAFT"
  | "PENDING"
  | "APPROVED"
  | "SHIPPED"
  | "RECEIVED"
  | "CANCELLED";

export type InvoiceStatus =
  | "DRAFT"
  | "ISSUED"
  | "PAID"
  | "OVERDUE"
  | "CANCELLED";

export type ShipmentStatus =
  | "PENDING"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "FAILED";

export type CustomerType = "BUSINESS" | "INDIVIDUAL";

/* =========================================================
   USERS
   ========================================================= */

export interface User extends BaseEntity {
  user_id: UUID;
  name: string;
  email: string;
  password_hash?: string;
  phone_number?: string;
  role: UserRole;
  supplier_id?: UUID | null;
  is_active: boolean;
}

/* =========================================================
   SUPPLIERS
   ========================================================= */

export interface Supplier extends BaseEntity {
  supplier_id: UUID;
  supplier_name: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  status: Status;
}

/* =========================================================
   CATEGORIES
   ========================================================= */

export interface Category extends BaseEntity {
  category_id: UUID;
  category_name: string;
  description?: string;
  parent_category_id?: UUID | null;
}

/* =========================================================
   PRODUCTS
   ========================================================= */

export interface Product extends BaseEntity {
  product_id: UUID;
  supplier_id: UUID;
  category_id?: UUID | null;
  product_name: string;
  description?: string;
  sku?: string;
  price?: number;
  cost_price?: number;
  weight?: number;
  status: Status;
}

/* =========================================================
   WAREHOUSES
   ========================================================= */

export interface Warehouse extends BaseEntity {
  warehouse_id: UUID;
  warehouse_name: string;
  location?: string;
  city?: string;
  capacity?: number;
  phone?: string;
  manager_id?: UUID;
  is_active?: boolean;
}

/* =========================================================
   INVENTORY
   ========================================================= */

export interface Inventory extends BaseEntity {
  inventory_id: UUID;
  product_id: UUID;
  warehouse_id: UUID;
  quantity: number;
  reorder_level?: number;
  last_restocked?: Timestamp;
}

/* =========================================================
   PURCHASE ORDERS
   ========================================================= */

export interface PurchaseOrder extends BaseEntity {
  po_id: UUID;
  supplier_id: UUID;
  warehouse_id?: UUID;
  order_number?: string;
  order_date?: string;
  expected_delivery?: string;
  total_amount?: number;
  status?: PurchaseOrderStatus;
}

/* =========================================================
   PURCHASE ORDER ITEMS
   ========================================================= */

export interface PurchaseOrderItem extends BaseEntity {
  po_item_id: UUID;
  po_id: UUID;
  product_id: UUID;
  quantity: number;
  price: number;
}

/* =========================================================
   INVOICE
   ========================================================= */

export interface Invoice extends BaseEntity {
  invoice_id: UUID;
  supplier_id: UUID;
  po_id?: UUID;
  invoice_number?: string;
  invoice_date?: string;
  total_amount?: number;
  status?: InvoiceStatus;
}

/* =========================================================
   INVOICE ITEMS
   ========================================================= */

export interface InvoiceItem extends BaseEntity {
  invoice_item_id: UUID;
  invoice_id: UUID;
  product_id: UUID;
  quantity: number;
  price: number;
}

/* =========================================================
   CUSTOMER
   ========================================================= */

export interface Customer extends BaseEntity {
  customer_id: UUID;
  customer_name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
  customer_type?: CustomerType;
}

/* =========================================================
   SHIPMENT
   ========================================================= */

export interface Shipment extends BaseEntity {
  shipment_id: UUID;
  po_id: UUID;
  warehouse_id?: UUID;
  carrier_name?: string;
  tracking_number?: string;
  shipment_date?: string;
  estimated_arrival?: string;
  actual_arrival?: string;
  status?: ShipmentStatus;
}