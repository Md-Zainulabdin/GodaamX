import { apiClient } from "@/lib/axios";
import { Invoice } from "@/types/global";
import { INVOICE_API } from "@/constants/api.constants";
import { InvoiceFormValues } from "@/schemas/schemas";
import { useApiQuery, useApiMutation } from "@/hooks/use-api-factory";

/* =========================================================
   Invoice Keys
   ========================================================= */

export const invoiceKeys = {
  all: ["invoices"] as const,
  detail: (id: string) => ["invoices", id] as const,
};

/* =========================================================
   Invoice Hooks
   ========================================================= */

export function useInvoices() {
  return useApiQuery<Invoice[]>(invoiceKeys.all, INVOICE_API.list);
}

export function useInvoice(id: string) {
  return useApiQuery<Invoice>(invoiceKeys.detail(id), INVOICE_API.detail(id), { enabled: !!id });
}

export function useCreateInvoice() {
  return useApiMutation(
    (body: InvoiceFormValues) => apiClient.post<Invoice>(INVOICE_API.create, body).then((r) => r.data),
    {
      invalidateKeys: [invoiceKeys.all],
      successMessage: "Invoice created successfully.",
      redirectPath: "/invoices",
      errorMessage: "Failed to create invoice",
    }
  );
}

export function useUpdateInvoice(id: string) {
  return useApiMutation(
    (body: Partial<InvoiceFormValues>) => apiClient.put<Invoice>(INVOICE_API.update(id), body).then((r) => r.data),
    {
      invalidateKeys: [invoiceKeys.all, invoiceKeys.detail(id)],
      successMessage: "Invoice updated successfully.",
      redirectPath: "/invoices",
      errorMessage: "Failed to update invoice",
    }
  );
}

export function useDeleteInvoice() {
  return useApiMutation(
    (id: string) => apiClient.delete(INVOICE_API.delete(id)).then(() => id),
    {
      invalidateKeys: [invoiceKeys.all],
      successMessage: "Invoice deleted.",
      errorMessage: "Failed to delete invoice",
    }
  );
}
