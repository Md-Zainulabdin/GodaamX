/* =========================================================
   API Endpoint Constants
   ========================================================= */

/* =========================================================
   BASE CONFIG
   ========================================================= */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

/*
   Helper to safely build API URLs
 */
const api = (path: string) => `${API_BASE_URL}${path}`;

/* =========================================================
   AUTH
   ========================================================= */

export const AUTH_API = {
  login: api("/auth/login"),
};

/* =========================================================
   SUPPLIERS
   ========================================================= */

export const SUPPLIER_API = {
  list: api("/suppliers"),
  create: api("/suppliers"),
  detail: (id: string) => api(`/suppliers/${id}`),
  update: (id: string) => api(`/suppliers/${id}`),
  delete: (id: string) => api(`/suppliers/${id}`),
};

/* =========================================================
   USERS
   ========================================================= */

export const USER_API = {
  list: api("/users"),
  create: api("/users"),
  detail: (id: string) => api(`/users/${id}`),
  update: (id: string) => api(`/users/${id}`),
  delete: (id: string) => api(`/users/${id}`),

  activate: (id: string) => api(`/users/${id}/activate`),
  deactivate: (id: string) => api(`/users/${id}/deactivate`),
};

/* =========================================================
   CATEGORIES
   ========================================================= */

export const CATEGORY_API = {
  list: api("/categories"),
  create: api("/categories"),
  detail: (id: string) => api(`/categories/${id}`),
  update: (id: string) => api(`/categories/${id}`),
  delete: (id: string) => api(`/categories/${id}`),
};

/* =========================================================
   WAREHOUSES
   ========================================================= */

export const WAREHOUSE_API = {
  list: api("/warehouses"),
  create: api("/warehouses"),
  detail: (id: string) => api(`/warehouses/${id}`),
  update: (id: string) => api(`/warehouses/${id}`),
  delete: (id: string) => api(`/warehouses/${id}`),
};

/* =========================================================
   PRODUCTS
   ========================================================= */

export const PRODUCT_API = {
  list: api("/products"),
  create: api("/products"),
  detail: (id: string) => api(`/products/${id}`),
  update: (id: string) => api(`/products/${id}`),
  delete: (id: string) => api(`/products/${id}`),

  bySupplier: (supplierId: string) =>
    api(`/products/supplier/${supplierId}`),

  byCategory: (categoryId: string) =>
    api(`/products/category/${categoryId}`),
};

/* =========================================================
   INVENTORY
   ========================================================= */

export const INVENTORY_API = {
  list: api("/inventory"),
  create: api("/inventory"),
  detail: (id: string) => api(`/inventory/${id}`),
  update: (id: string) => api(`/inventory/${id}`),
  delete: (id: string) => api(`/inventory/${id}`),

  byWarehouse: (warehouseId: string) =>
    api(`/inventory/warehouse/${warehouseId}`),

  byProduct: (productId: string) =>
    api(`/inventory/product/${productId}`),
};

/* =========================================================
   PURCHASE ORDERS
   ========================================================= */

export const PURCHASE_ORDER_API = {
  list: api("/purchase-orders"),
  create: api("/purchase-orders"),
  detail: (id: string) => api(`/purchase-orders/${id}`),
  update: (id: string) => api(`/purchase-orders/${id}`),
  delete: (id: string) => api(`/purchase-orders/${id}`),

  items: (poId: string) => api(`/purchase-orders/${poId}/items`),
};

/* =========================================================
   PURCHASE ORDER ITEMS
   ========================================================= */

export const PURCHASE_ORDER_ITEM_API = {
  create: api("/purchase-order-items"),
  update: (id: string) => api(`/purchase-order-items/${id}`),
  delete: (id: string) => api(`/purchase-order-items/${id}`),
};

/* =========================================================
   INVOICES
   ========================================================= */

export const INVOICE_API = {
  list: api("/invoices"),
  create: api("/invoices"),
  detail: (id: string) => api(`/invoices/${id}`),
  update: (id: string) => api(`/invoices/${id}`),
  delete: (id: string) => api(`/invoices/${id}`),

  bySupplier: (supplierId: string) =>
    api(`/invoices/supplier/${supplierId}`),
};

/* =========================================================
   INVOICE ITEMS
   ========================================================= */

export const INVOICE_ITEM_API = {
  create: api("/invoice-items"),
  update: (id: string) => api(`/invoice-items/${id}`),
  delete: (id: string) => api(`/invoice-items/${id}`),
};

/* =========================================================
   CUSTOMERS
   ========================================================= */

export const CUSTOMER_API = {
  list: api("/customers"),
  create: api("/customers"),
  detail: (id: string) => api(`/customers/${id}`),
  update: (id: string) => api(`/customers/${id}`),
  delete: (id: string) => api(`/customers/${id}`),
};

/* =========================================================
   SHIPMENTS
   ========================================================= */

export const SHIPMENT_API = {
  list: api("/shipments"),
  create: api("/shipments"),
  detail: (id: string) => api(`/shipments/${id}`),
  update: (id: string) => api(`/shipments/${id}`),
  delete: (id: string) => api(`/shipments/${id}`),

  byPurchaseOrder: (poId: string) =>
    api(`/shipments/purchase-order/${poId}`),
};