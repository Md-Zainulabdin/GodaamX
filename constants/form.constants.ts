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
  },
  {
    name: "phone_number",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter phone number",
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
  },
  {
    name: "contact_phone",
    label: "Phone",
    type: "tel",
    placeholder: "Enter phone number",
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
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
  },
  {
    name: "parent_category_id",
    label: "Parent Category",
    type: "select",
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
  },
  {
    name: "supplier_id",
    label: "Supplier",
    type: "select",
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
  },
  {
    name: "weight",
    label: "Weight",
    type: "number",
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
  },
  {
    name: "city",
    label: "City",
  },
  {
    name: "capacity",
    label: "Capacity",
    type: "number",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
  },
  {
    name: "manager_id",
    label: "Manager",
    type: "select",
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
  },
  {
    name: "order_date",
    label: "Order Date",
    type: "date",
  },
  {
    name: "expected_delivery",
    label: "Expected Delivery",
    type: "date",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Pending", value: "Pending" },
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
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
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
  },
];

/* =========================================================
   SHIPMENT FORM
   ========================================================= */

export const SHIPMENT_FORM_FIELDS: FormField[] = [
  {
    name: "po_id",
    label: "Purchase Order",
    type: "select",
  },
  {
    name: "warehouse_id",
    label: "Warehouse",
    type: "select",
  },
  {
    name: "tracking_number",
    label: "Tracking Number",
    placeholder: "Enter tracking number",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Pending", value: "PENDING" },
      { label: "In Transit", value: "IN_TRANSIT" },
      { label: "Delivered", value: "DELIVERED" },
      { label: "Cancelled", value: "CANCELLED" },
    ],
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
  },
  {
    name: "invoice_number",
    label: "Invoice Number",
    placeholder: "Enter invoice number",
  },
  {
    name: "invoice_date",
    label: "Invoice Date",
    type: "date",
  },
  {
    name: "total_amount",
    label: "Total Amount",
    type: "number",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Pending", value: "Pending" },
      { label: "Paid", value: "Paid" },
      { label: "Cancelled", value: "Cancelled" },
    ],
  },
];
