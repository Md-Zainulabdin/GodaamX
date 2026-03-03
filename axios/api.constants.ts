/* =========================================================
   Inventory & Logistic ERP System – API Endpoint Constants
   ========================================================= */

/* =========================================================
   BASE CONFIG
   ========================================================= */

// Base API URL (can be overridden via environment variables)
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

/**
 * Helper to safely build API URLs
 */
const api = (path: string) => `${API_BASE_URL}${path}`;

/* =========================================================
   PROCUREMENT
   ========================================================= */

export const PROCUREMENT_API = {
  suppliers: {
    list: api("/suppliers"),
    create: api("/suppliers"),
    detail: (id: string) => api(`/suppliers/${id}`),
    update: (id: string) => api(`/suppliers/${id}`),
    delete: (id: string) => api(`/suppliers/${id}`),
  },

  supplierBankDetails: {
    listBySupplier: (supplierId: string) =>
      api(`/suppliers/${supplierId}/bank-details`),
  },

  purchaseOrders: {
    list: api("/purchase-orders"),
    create: api("/purchase-orders"),
    detail: (id: string) => api(`/purchase-orders/${id}`),
    updateStatus: (id: string) =>
      api(`/purchase-orders/${id}/status`),
  },
};

/* =========================================================
   INVENTORY
   ========================================================= */

export const INVENTORY_API = {
  categories: {
    list: api("/categories"),
    create: api("/categories"),
    detail: (id: string) => api(`/categories/${id}`),
  },

  products: {
    list: api("/products"),
    create: api("/products"),
    detail: (id: string) => api(`/products/${id}`),
  },

  stock: {
    overview: api("/stock"),
    byWarehouse: (warehouseId: string) =>
      api(`/stock/warehouse/${warehouseId}`),
  },

  transactions: {
    list: api("/inventory-transactions"),
  },
};

/* =========================================================
   WAREHOUSE
   ========================================================= */

export const WAREHOUSE_API = {
  warehouses: {
    list: api("/warehouses"),
    create: api("/warehouses"),
    detail: (id: string) => api(`/warehouses/${id}`),
  },

  zones: {
    list: api("/warehouse-zones"),
    byWarehouse: (warehouseId: string) =>
      api(`/warehouse-zones/warehouse/${warehouseId}`),
  },
};

/* =========================================================
   SALES
   ========================================================= */

export const SALES_API = {
  customers: {
    list: api("/customers"),
    create: api("/customers"),
    detail: (id: string) => api(`/customers/${id}`),
  },

  orders: {
    list: api("/sales-orders"),
    create: api("/sales-orders"),
    detail: (id: string) => api(`/sales-orders/${id}`),
    updateStatus: (id: string) =>
      api(`/sales-orders/${id}/status`),
  },

  invoices: {
    list: api("/invoices"),
    detail: (id: string) => api(`/invoices/${id}`),
  },
};

/* =========================================================
   LOGISTICS
   ========================================================= */

export const LOGISTICS_API = {
  inboundShipments: {
    list: api("/inbound-shipments"),
    detail: (id: string) => api(`/inbound-shipments/${id}`),
  },

  outboundShipments: {
    list: api("/outbound-shipments"),
    detail: (id: string) => api(`/outbound-shipments/${id}`),
    track: (trackingNo: string) =>
      api(`/outbound-shipments/track/${trackingNo}`),
  },
};

/* =========================================================
   RETURNS
   ========================================================= */

export const RETURNS_API = {
  salesReturns: {
    list: api("/sales-returns"),
    create: api("/sales-returns"),
  },

  purchaseReturns: {
    list: api("/purchase-returns"),
    create: api("/purchase-returns"),
  },
};

/* =========================================================
   FINANCE
   ========================================================= */

export const FINANCE_API = {
  currency: {
    list: api("/currencies"),
  },

  exchangeRates: {
    list: api("/exchange-rates"),
  },

  bills: {
    list: api("/bills"),
    detail: (id: string) => api(`/bills/${id}`),
  },

  payments: {
    list: api("/payments"),
    create: api("/payments"),
  },
};

/* =========================================================
   SECURITY
   ========================================================= */

export const SECURITY_API = {
  roles: {
    list: api("/roles"),
  },

  permissions: {
    list: api("/permissions"),
  },

  users: {
    list: api("/users"),
    create: api("/users"),
    detail: (id: string) => api(`/users/${id}`),
  },
};

/* =========================================================
   SYSTEM
   ========================================================= */

export const SYSTEM_API = {
  notifications: {
    list: api("/notifications"),
    markAsRead: (id: string) =>
      api(`/notifications/${id}/read`),
  },

  auditLog: {
    list: api("/audit-log"),
  },
};