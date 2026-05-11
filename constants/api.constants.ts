/* =========================================================
   API Endpoint Constants
   ========================================================= */

/* =========================================================
   BASE CONFIG
   ========================================================= */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

/*
   Helper to safely build API URLs
 */
const api = (path: string) => `${API_BASE_URL}${path}`;

/* =========================================================
   AUTH
   ========================================================= */

export const AUTH_API = {
   login: api("/auth/login"),
   register: api("/auth/register"),
};

/* =========================================================
   REGISTRATION REQUESTS (ADMIN)
   ========================================================= */

export const REGISTRATION_REQUEST_API = {
   list: api("/admin/registration-requests"),
   approve: (requestId: string) => api(`/admin/registration-requests/${requestId}/approve`),
   reject: (requestId: string) => api(`/admin/registration-requests/${requestId}/reject`),
};

/* =========================================================
   SUPPLIERS
   ========================================================= */

export const SUPPLIER_API = {
   list: api("/suppliers"),
   create: api("/suppliers"),
   detail: (id: string) => api(`/suppliers/${id}`),
   put: (id: string) => api(`/suppliers/${id}`),
   delete: (id: string) => api(`/suppliers/${id}`),
};

/* =========================================================
   USERS
   ========================================================= */

export const USER_API = {
   list: api("/users"),
   create: api("/users"),
   detail: (id: string) => api(`/users/${id}`),
   put: (id: string) => api(`/users/${id}`),
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
   put: (id: string) => api(`/categories/${id}`),
   delete: (id: string) => api(`/categories/${id}`),
};

/* =========================================================
   WAREHOUSES
   ========================================================= */

export const WAREHOUSE_API = {
   list: api("/warehouses"),
   create: api("/warehouses"),
   detail: (id: string) => api(`/warehouses/${id}`),
   put: (id: string) => api(`/warehouses/${id}`),
   delete: (id: string) => api(`/warehouses/${id}`),
};

/* =========================================================
   PRODUCTS
   ========================================================= */

export const PRODUCT_API = {
   list: api("/products"),
   create: api("/products"),
   detail: (id: string) => api(`/products/${id}`),
   put: (id: string) => api(`/products/${id}`),
   delete: (id: string) => api(`/products/${id}`),

   bySupplier: (supplierId: string) => api(`/products/supplier/${supplierId}`),

   byCategory: (categoryId: string) => api(`/products/category/${categoryId}`),
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

   byWarehouse: (warehouseId: string) => api(`/inventory/warehouse/${warehouseId}`),

   byProduct: (productId: string) => api(`/inventory/product/${productId}`),
};

/* =========================================================
   PURCHASE ORDERS
   ========================================================= */

export const PURCHASE_ORDER_API = {
   list: api("/purchase-order"),
   create: api("/purchase-order"),
   detail: (id: string) => api(`/purchase-order/${id}`),
   update: (id: string) => api(`/purchase-order/${id}`),
   delete: (id: string) => api(`/purchase-order/${id}`),
};

/* =========================================================
   PURCHASE ORDER ITEMS (POI)
   ========================================================= */

export const POI_API = {
   list: (poId: string) => api(`/poi/${poId}/items`),
   create: (poId: string) => api(`/poi/${poId}/items`),
   detail: (poId: string, itemId: string) => api(`/poi/${poId}/items/${itemId}`),
   update: (poId: string, itemId: string) => api(`/poi/${poId}/items/${itemId}`),
   delete: (poId: string, itemId: string) => api(`/poi/${poId}/items/${itemId}`),
};

/* =========================================================
   INVOICES
   ========================================================= */

export const INVOICE_API = {
   list: api("/invoice"),
   create: api("/invoice"),
   detail: (id: string) => api(`/invoice/${id}`),
   update: (id: string) => api(`/invoice/${id}`),
   delete: (id: string) => api(`/invoice/${id}`),

   bySupplier: (supplierId: string) => api(`/invoice/supplier/${supplierId}`),
};

/* =========================================================
   INVOICE ITEMS
   ========================================================= */

export const INVOICE_ITEM_API = {
   list: (invoiceId: string) => api(`/invoice/${invoiceId}/items`),
   create: (invoiceId: string) => api(`/invoice/${invoiceId}/items`),
   detail: (invoiceId: string, itemId: string) => api(`/invoice/${invoiceId}/items/${itemId}`),
   update: (invoiceId: string, itemId: string) => api(`/invoice/${invoiceId}/items/${itemId}`),
   delete: (invoiceId: string, itemId: string) => api(`/invoice/${invoiceId}/items/${itemId}`),
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

   byPurchaseOrder: (poId: string) => api(`/shipments/purchase-order/${poId}`),
};

/* =========================================================
   CHAT
   ========================================================= */

export const CHAT_API = {
   sendMessage: api("/chat/message"),
};

/* =========================================================
   SPEECH
   ========================================================= */

export const SPEECH_API = {
   transcribe: api("/speech/transcribe"),
   synthesize: api("/speech/synthesize"),
};

/* =========================================================
   DASHBOARD
   ========================================================= */

export const DASHBOARD_API = {
   get: api("/dashboard"),
};
