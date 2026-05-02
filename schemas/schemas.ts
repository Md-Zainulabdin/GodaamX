import { z } from "zod";

/* =========================================================
   LOGIN
   ========================================================= */

export const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  // password: z.string().min(6, "Password must be at least 6 characters"), 
  password: z.string(), // development only
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email").optional().or(z.literal("")),
  phone: z.string().min(7, "Phone number must be at least 7 digits").optional().or(z.literal("")),
  company_name: z.string().optional(),
  message: z.string().optional(),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Please enter a valid email"),
  phone_number: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  role: z.string().min(1, "Please select a role"),
  supplier_id: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;

export const supplierSchema = z.object({
  supplier_name: z.string().min(2, "Supplier name must be at least 2 characters"),
  contact_email: z.email("Please enter a valid email").optional().or(z.literal("")),
  contact_phone: z.string().min(7, "Phone number must be at least 7 digits").optional().or(z.literal("")),
  address: z.string().optional(),
  status: z.enum(["Active", "Inactive"], { message: "Please select a status" }),
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;

export const productSchema = z.object({
  supplier_id: z.string().uuid("Please select a supplier"),
  category_id: z.string().uuid().optional().nullable(),
  product_name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().optional(),
  sku: z.string().min(1, "SKU is required"),
  price: z.number().positive("Price must be a positive number"),
  cost_price: z.number().positive("Cost price must be a positive number").optional().nullable(),
  weight: z.number().positive("Weight must be a positive number").optional().nullable(),
  status: z.enum(["Active", "Inactive"], { message: "Please select a status" }),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const categorySchema = z.object({
  category_name: z.string().min(2, "Category name must be at least 2 characters"),
  description: z.string().optional(),
  parent_category_id: z.string().optional().nullable(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

export const warehouseSchema = z.object({
  warehouse_name: z.string().min(2, "Warehouse name must be at least 2 characters"),
  location: z.string().optional(),
  city: z.string().optional(),
  capacity: z.number().positive("Capacity must be a positive number").optional().nullable(),
  phone: z.string().min(7, "Phone number must be at least 7 digits").optional().or(z.literal("")),
  status: z.enum(["Active", "Inactive"], { message: "Please select a status" }),
  is_active: z.boolean().optional(),
});

export type WarehouseFormValues = z.infer<typeof warehouseSchema>;

export const inventorySchema = z.object({
  product_id: z.string().uuid("Please select a product"),
  warehouse_id: z.string().uuid("Please select a warehouse"),
  quantity: z.number().min(0, "Quantity must be 0 or greater"),
  reorder_level: z.number().min(0, "Reorder level must be 0 or greater").optional().nullable(),
  last_restocked: z.string().optional().nullable(),
});

export type InventoryFormValues = z.infer<typeof inventorySchema>;

export const purchaseOrderSchema = z.object({
  supplier_id: z.string().uuid("Please select a supplier"),
  warehouse_id: z.string().uuid("Please select a warehouse").optional().nullable(),
  order_number: z.string().min(1, "Order number is required"),
  order_date: z.string().optional(),
  expected_delivery: z.string().optional(),
  total_amount: z.number().positive("Amount must be a positive number").optional().nullable(),
  status: z.enum(["Draft", "Pending", "Approved", "Shipped", "Received", "Cancelled"], { message: "Please select a status" }),
});

export type PurchaseOrderFormValues = z.infer<typeof purchaseOrderSchema>;

export const invoiceSchema = z.object({
  supplier_id: z.string().uuid("Please select a supplier"),
  po_id: z.string().uuid("Please select a purchase order").optional().nullable(),
  invoice_number: z.string().optional(),
  invoice_date: z.string().optional(),
  total_amount: z.number().positive("Amount must be a positive number").optional().nullable(),
  status: z.enum(["Draft", "Pending", "Paid", "Overdue", "Cancelled"], { message: "Please select a status" }),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;

export const customerSchema = z.object({
  customer_name: z.string().min(2, "Customer name must be at least 2 characters"),
  contact_person: z.string().min(2, "Contact person must be at least 2 characters").optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  phone: z.string().min(7, "Phone number must be at least 7 digits").optional().or(z.literal("")),
  address: z.string().optional(),
  customer_type: z.enum(["Business", "Individual"], { message: "Please select a customer type" }),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;

export const purchaseOrderItemSchema = z.object({
  po_id: z.string().uuid("Please select a purchase order"),
  product_id: z.string().uuid("Please select a product"),
  quantity: z.number().positive("Quantity must be a positive number"),
  price: z.number().positive("Price must be a positive number"),
});

export type PurchaseOrderItemFormValues = z.infer<typeof purchaseOrderItemSchema>;

export const invoiceItemSchema = z.object({
  invoice_id: z.string().uuid("Please select an invoice"),
  product_id: z.string().uuid("Please select a product"),
  quantity: z.number().positive("Quantity must be a positive number"),
  price: z.number().positive("Price must be a positive number"),
});

export type InvoiceItemFormValues = z.infer<typeof invoiceItemSchema>;

export const shipmentSchema = z.object({
  purchase_order_id: z.string().uuid("Please select a purchase order"),
  warehouse_id: z.string().uuid("Please select a warehouse").optional().nullable(),
  carrier_name: z.string().optional(),
  tracking_number: z.string().optional(),
  shipment_date: z.string().optional(),
  estimated_arrival: z.string().optional(),
  actual_arrival: z.string().optional(),
  status: z.enum(["Draft", "Pending", "Paid", "Overdue", "Cancelled"], { message: "Please select a status" }),
  notes: z.string().optional(),
});

export type ShipmentFormValues = z.infer<typeof shipmentSchema>;
