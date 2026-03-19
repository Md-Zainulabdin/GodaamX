import { z } from "zod";

/* =========================================================
   LOGIN
   ========================================================= */

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email").optional().or(z.literal("")),
  phone: z.string().min(7, "Phone number too short").optional().or(z.literal("")),
  company_name: z.string().optional(),
  message: z.string().optional(),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  phone_number: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  role: z.string().min(1, "Role is required"),
  supplier_id: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;

export const supplierSchema = z.object({
  supplier_name: z.string().min(2, "Supplier name must be at least 2 characters"),
  contact_email: z.email("Invalid email").optional().or(z.literal("")),
  contact_phone: z.string().min(7, "Phone number too short").optional().or(z.literal("")),
  address: z.string().optional(),
  status: z.enum(["Active", "Inactive"]),
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;

export const productSchema = z.object({
  supplier_id: z.string().uuid().optional(),
  category_id: z.string().uuid().optional(),
  product_name: z.string().min(2),
  description: z.string().optional(),
  sku: z.string().optional(),
  price: z.number().positive().optional(),
  cost_price: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  status: z.enum(["Active", "Inactive"]),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const categorySchema = z.object({
  category_name: z.string().min(2, "Category name required"),
  description: z.string().optional(),
  parent_category_id: z.string().uuid().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

export const warehouseSchema = z.object({
  warehouse_name: z.string().min(2),
  location: z.string().optional(),
  city: z.string().optional(),
  capacity: z.number().positive().optional(),
});

export type WarehouseFormValues = z.infer<typeof warehouseSchema>;

export const inventorySchema = z.object({
  product_id: z.string().uuid(),
  warehouse_id: z.string().uuid(),
  quantity: z.number().min(0),
  reorder_level: z.number().optional(),
});

export type InventoryFormValues = z.infer<typeof inventorySchema>;

export const purchaseOrderSchema = z.object({
  supplier_id: z.string().uuid(),
  warehouse_id: z.string().uuid().optional(),
  order_number: z.string().optional(),
  order_date: z.string().optional(),
  expected_delivery: z.string().optional(),
  total_amount: z.number().optional(),
  status: z.enum(["PENDING", "APPROVED", "DELIVERED", "CANCELLED"]),
});

export type PurchaseOrderFormValues = z.infer<typeof purchaseOrderSchema>;

export const invoiceSchema = z.object({
  supplier_id: z.string().uuid(),
  po_id: z.string().uuid().optional(),
  invoice_number: z.string().optional(),
  invoice_date: z.string().optional(),
  total_amount: z.number().optional(),
  status: z.enum(["PENDING", "PAID", "CANCELLED"]),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;

export const customerSchema = z.object({
  customer_name: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;

export const shipmentSchema = z.object({
  po_id: z.string().uuid(),
  warehouse_id: z.string().uuid().optional(),
  tracking_number: z.string().optional(),
  status: z.enum(["PENDING", "IN_TRANSIT", "DELIVERED", "CANCELLED"]),
});

export type ShipmentFormValues = z.infer<typeof shipmentSchema>;
