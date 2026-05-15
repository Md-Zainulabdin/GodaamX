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
   REGISTRATION REQUESTS
   ========================================================= */

export interface RegistrationRequest {
  request_id: UUID;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  created_at: Timestamp;
}


/* =========================================================
   USERS
   ========================================================= */

export interface User extends BaseEntity {
  user_id: UUID;
  name: string;
  email: string;
  password_hash?: string;
  phone_number?: string;
  role: string;
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
  status: string;
}

/* =========================================================
   CATEGORIES
   ========================================================= */

export interface Category extends BaseEntity {
  category_id: UUID;
  user_id?: UUID;
  category_name: string;
  description?: string;
  parent_category_id?: UUID | null;
  parent_category?: {
    category_id: string;
    category_name: string;
    description: string;
  } | null;
}

/* =========================================================
   PRODUCTS
   ========================================================= */

export interface Product extends BaseEntity {
  product_id: UUID;
  supplier_id: UUID;
  user_id?: UUID;
  category_id?: UUID | null;
  product_name: string;
  description?: string;
  sku?: string;
  price?: number | string;
  cost_price?: number | string;
  weight?: number | string;
  status: string;
  supplier?: {
    supplier_id: string;
    supplier_name: string;
    contact_email: string;
    contact_phone: string;
  } | null;
  category?: {
    category_id: string;
    category_name: string;
    description: string;
  } | null;
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
  is_active?: boolean;
}

/* =========================================================
   INVENTORY
   ========================================================= */

export interface Inventory extends BaseEntity {
  inventory_id: UUID;
  user_id?: UUID;
  product_id: UUID;
  warehouse_id: UUID;
  quantity: number;
  reorder_level?: number;
  last_restocked?: Timestamp;
  product?: {
    product_id: string;
    product_name: string;
    sku: string;
    price: string;
  } | null;
  warehouse?: {
    warehouse_id: string;
    warehouse_name: string;
    location: string;
    city: string;
  } | null;
}

/* =========================================================
   PURCHASE ORDERS
   ========================================================= */

export interface PurchaseOrder extends BaseEntity {
  po_id: UUID;
  supplier_id: UUID;
  user_id?: UUID;
  warehouse_id?: UUID;
  order_number?: string;
  order_date?: string;
  expected_delivery?: string;
  total_amount?: number | string;
  status?: string;
  supplier?: {
    supplier_id: string;
    supplier_name: string;
    contact_email: string;
    contact_phone: string;
  } | null;
  warehouse?: {
    warehouse_id: string;
    warehouse_name: string;
    location: string;
    city: string;
  } | null;
}

/* =========================================================
   PURCHASE ORDER ITEMS
   ========================================================= */

export interface PurchaseOrderItem extends BaseEntity {
  po_item_id: UUID;
  po_id: UUID;
  product_id: UUID;
  user_id?: UUID;
  quantity: number;
  price: number | string;
  purchase_order?: {
    po_id: string;
    order_number: string;
    order_date: string;
    status: string;
  } | null;
  product?: {
    product_id: string;
    product_name: string;
    sku: string;
    price: string;
  } | null;
}

/* =========================================================
   INVOICE
   ========================================================= */

export interface Invoice extends BaseEntity {
  invoice_id: UUID;
  supplier_id: UUID;
  user_id?: UUID;
  po_id?: UUID;
  invoice_number?: string;
  invoice_date?: string;
  total_amount?: number | string;
  status?: string;
  supplier?: {
    supplier_id: string;
    supplier_name: string;
    contact_email: string;
    contact_phone: string;
  } | null;
  purchase_order?: {
    po_id: string;
    order_number: string;
    order_date: string;
    status: string;
  } | null;
}

/* =========================================================
   INVOICE ITEMS
   ========================================================= */

export interface InvoiceItem extends BaseEntity {
  invoice_item_id: UUID;
  invoice_id: UUID;
  product_id: UUID;
  user_id?: UUID;
  quantity: number;
  price: number | string;
  invoice?: {
    invoice_id: string;
    invoice_number: string;
    invoice_date: string;
    total_amount: string;
    status: string;
  } | null;
  product?: {
    product_id: string;
    product_name: string;
    sku: string;
    price: string;
  } | null;
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
  customer_type?: string;
}

/* =========================================================
   SHIPMENT
   ========================================================= */

export interface Shipment extends BaseEntity {
  shipment_id: UUID;
  po_id: UUID;
  user_id?: UUID;
  warehouse_id?: UUID;
  carrier_name?: string;
  tracking_number?: string;
  shipment_date?: string;
  estimated_arrival?: string;
  actual_arrival?: string | null;
  status?: string;
  notes?: string;
  purchase_order?: {
    po_id: string;
    order_number: string;
    order_date: string;
    status: string;
    supplier_id: string;
  } | null;
  warehouse?: {
    warehouse_id: string;
    warehouse_name: string;
    location: string;
    city: string;
  } | null;
}

/* =========================================================
   DASHBOARD / ANALYTICS
   ========================================================= */

export type DashboardData = SuperAdminDashboard | SupplierDashboard;

export interface SuperAdminDashboard {
  role: "SUPERADMIN";
  cards: {
    revenue: number | string;
    orders: number;
    suppliers: number;
    low_stock: number;
  };
  charts: {
    revenue_trend: { month: string; revenue: number }[];
    order_status: { status: string; count: number }[];
    top_suppliers: { supplier: string; orders: number }[];
  };
}

export interface SupplierDashboard {
  role: "SUPPLIER";
  cards: {
    revenue: number | string;
    orders: number;
    pending_orders: number;
    low_stock: number;
  };
  charts: {
    sales_trend: { month: string; sales: number }[];
    order_status: { status: string; count: number }[];
    top_products: { product: string; quantity: number }[];
  };
}

/* =========================================================
   CHAT
   ========================================================= */

export interface Conversation {
  conversation_id: string;
  title: string;
  message_count: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  message_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface ChatMessageResponse {
  reply: string;
  conversation_id: string;
}

export interface ChatRequest {
  prompt: string;
  conversation_id: string | null;
}
