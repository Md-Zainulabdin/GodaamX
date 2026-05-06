/* =========================================================
   FORM FIELD TYPE
   ========================================================= */

export type FormField = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  hidden?: boolean;
  optional?: boolean;
};

/* =========================================================
   USER FORM
   ========================================================= */

export const USER_FORM_FIELDS: FormField[] = [
  {
    name: "name",
    label: "Full Name",
    placeholder: "Enter full name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email address",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    optional: true,
  },
  {
    name: "phone_number",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter phone number",
    optional: true,
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: [
      { label: "Super Admin", value: "SUPERADMIN" },
      { label: "Supplier", value: "SUPPLIER" },
    ],
  },
  {
    name: "supplier_id",
    label: "Supplier",
    type: "select",
    optional: true,
  },
];

/* =========================================================
   SUPPLIER FORM
   ========================================================= */

export const SUPPLIER_FORM_FIELDS: FormField[] = [
  {
    name: "supplier_name",
    label: "Supplier Name",
    placeholder: "Enter supplier name",
    type: "text",
  },
  {
    name: "contact_email",
    label: "Email",
    type: "email",
    placeholder: "Enter email address",
    optional: true,
  },
  {
    name: "contact_phone",
    label: "Phone",
    type: "tel",
    placeholder: "Enter phone number",
    optional: true,
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    optional: true,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
];

/* =========================================================
   CATEGORY FORM
   ========================================================= */

export const CATEGORY_FORM_FIELDS: FormField[] = [
  {
    name: "category_name",
    label: "Category Name",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    optional: true,
  },
  {
    name: "parent_category_id",
    label: "Parent Category",
    type: "select",
    optional: true,
  },
];

/* =========================================================
   PRODUCT FORM
   ========================================================= */

export const PRODUCT_FORM_FIELDS: FormField[] = [
  {
    name: "product_name",
    label: "Product Name",
  },
  {
    name: "sku",
    label: "SKU",
  },
  {
    name: "category_id",
    label: "Category",
    type: "select",
    optional: true,
  },
  {
    name: "supplier_id",
    label: "Supplier",
    type: "select",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    optional: true,
  },
  {
    name: "price",
    label: "Price",
    type: "number",
  },
  {
    name: "cost_price",
    label: "Cost Price",
    type: "number",
    optional: true,
  },
  {
    name: "weight",
    label: "Weight",
    type: "number",
    optional: true,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
];

/* =========================================================
   WAREHOUSE FORM
   ========================================================= */

export const WAREHOUSE_FORM_FIELDS: FormField[] = [
  {
    name: "warehouse_name",
    label: "Warehouse Name",
  },
  {
    name: "location",
    label: "Location",
    optional: true,
  },
  {
    name: "city",
    label: "City",
    optional: true,
  },
  {
    name: "capacity",
    label: "Capacity",
    type: "number",
    optional: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    optional: true,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
];

/* =========================================================
   PURCHASE ORDER FORM
   ========================================================= */

export const PURCHASE_ORDER_FORM_FIELDS: FormField[] = [
  {
    name: "supplier_id",
    label: "Supplier",
    type: "select",
  },
  {
    name: "warehouse_id",
    label: "Warehouse",
    type: "select",
    optional: true,
  },
  {
    name: "order_number",
    label: "Order Number",
    placeholder: "Enter order number",
  },
  {
    name: "order_date",
    label: "Order Date",
    type: "date",
    optional: true,
  },
  {
    name: "expected_delivery",
    label: "Expected Delivery",
    type: "date",
    optional: true,
  },
  {
    name: "total_amount",
    label: "Total Amount",
    type: "number",
    optional: true,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Draft", value: "Draft" },
      { label: "Pending", value: "Pending" },
      { label: "Approved", value: "Approved" },
      { label: "Shipped", value: "Shipped" },
      { label: "Received", value: "Received" },
      { label: "Cancelled", value: "Cancelled" },
    ],
  },
];

/* =========================================================
   CUSTOMER FORM
   ========================================================= */

export const CUSTOMER_FORM_FIELDS: FormField[] = [
  {
    name: "customer_name",
    label: "Customer Name",
  },
  {
    name: "contact_person",
    label: "Contact Person",
    optional: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    optional: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    optional: true,
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    optional: true,
  },
  {
    name: "customer_type",
    label: "Customer Type",
    type: "select",
    options: [
      { label: "Business", value: "Business" },
      { label: "Individual", value: "Individual" },
    ],
  },
];

/* =========================================================
   INVENTORY FORM
   ========================================================= */

export const INVENTORY_FORM_FIELDS: FormField[] = [
  {
    name: "product_id",
    label: "Product",
    type: "select",
  },
  {
    name: "warehouse_id",
    label: "Warehouse",
    type: "select",
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "number",
  },
  {
    name: "reorder_level",
    label: "Reorder Level",
    type: "number",
    placeholder: "Minimum stock level",
    optional: true,
  },
  {
    name: "last_restocked",
    label: "Last Restocked",
    type: "date",
    optional: true,
  },
];

/* =========================================================
   SHIPMENT FORM
   ========================================================= */

export const SHIPMENT_FORM_FIELDS: FormField[] = [
  {
    name: "purchase_order_id",
    label: "Purchase Order",
    type: "select",
  },
  {
    name: "warehouse_id",
    label: "Warehouse",
    type: "select",
    optional: true,
  },
  {
    name: "carrier_name",
    label: "Carrier Name",
    type: "text",
    placeholder: "Enter carrier name (e.g. DHL, FedEx)",
  },
  {
    name: "shipment_date",
    label: "Shipment Date",
    type: "date",
    optional: true,
  },
  {
    name: "estimated_arrival",
    label: "Estimated Arrival",
    type: "date",
    optional: true,
  },
  {
    name: "actual_arrival",
    label: "Actual Arrival",
    type: "date",
    optional: true,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Pending", value: "Pending" },
      { label: "In Transit", value: "In Transit" },
      { label: "Delivered", value: "Delivered" },
      { label: "Returned", value: "Returned" },
      { label: "Cancelled", value: "Cancelled" },
    ],
  },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    optional: true,
  },
];

/* =========================================================
   INVOICE FORM
   ========================================================= */

export const INVOICE_FORM_FIELDS: FormField[] = [
  {
    name: "supplier_id",
    label: "Supplier",
    type: "select",
  },
  {
    name: "po_id",
    label: "Purchase Order",
    type: "select",
    optional: true,
  },
  {
    name: "invoice_number",
    label: "Invoice Number",
    placeholder: "Enter invoice number",
    optional: true,
  },
  {
    name: "invoice_date",
    label: "Invoice Date",
    type: "date",
    optional: true,
  },
  {
    name: "total_amount",
    label: "Total Amount",
    type: "number",
    optional: true,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Draft", value: "Draft" },
      { label: "Pending", value: "Pending" },
      { label: "Paid", value: "Paid" },
      { label: "Overdue", value: "Overdue" },
      { label: "Cancelled", value: "Cancelled" },
    ],
  },
];

/* =========================================================
   PURCHASE ORDER ITEM (POI) FORM
   ========================================================= */

export const POI_FORM_FIELDS: FormField[] = [
  {
    name: "po_id",
    label: "Purchase Order",
    type: "select",
  },
  {
    name: "product_id",
    label: "Product",
    type: "select",
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "number",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
  },
];

/* =========================================================
   INVOICE ITEM FORM
   ========================================================= */

export const INVOICE_ITEM_FORM_FIELDS: FormField[] = [
  {
    name: "invoice_id",
    label: "Invoice",
    type: "select",
  },
  {
    name: "product_id",
    label: "Product",
    type: "select",
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "number",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
  },
];
