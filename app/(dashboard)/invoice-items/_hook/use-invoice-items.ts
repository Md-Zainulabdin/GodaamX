import { apiClient } from "@/lib/axios";
import { InvoiceItem } from "@/types/global";
import { INVOICE_ITEM_API } from "@/constants/api.constants";
import { InvoiceItemFormValues } from "@/schemas/schemas";
import { useApiQuery, useApiMutation } from "@/hooks/use-api-factory";

/* =========================================================
   Invoice Item Keys
   ========================================================= */

export const invoiceItemKeys = {
  all: (invoiceId?: string) => ["invoice-items", invoiceId] as const,
  detail: (invoiceId: string, id: string) => ["invoice-items", invoiceId, id] as const,
};

/* =========================================================
   Invoice Item Hooks
   ========================================================= */

export function useInvoiceItems(invoiceId: string) {
  return useApiQuery<InvoiceItem[]>(invoiceItemKeys.all(invoiceId), INVOICE_ITEM_API.list(invoiceId), {
    enabled: !!invoiceId,
  });
}

export function useInvoiceItem(invoiceId: string, id: string) {
  return useApiQuery<InvoiceItem>(invoiceItemKeys.detail(invoiceId, id), INVOICE_ITEM_API.detail(invoiceId, id), {
    enabled: !!invoiceId && !!id,
  });
}

export function useCreateInvoiceItem(invoiceId: string) {
  return useApiMutation(
    (body: InvoiceItemFormValues) => apiClient.post<InvoiceItem>(INVOICE_ITEM_API.create(invoiceId), body).then((r) => r.data),
    {
      invalidateKeys: [invoiceItemKeys.all(invoiceId)],
      successMessage: "Invoice item added successfully.",
      redirectPath: `/invoice-items?invoice_id=${invoiceId}`,
      errorMessage: "Failed to add invoice item",
    }
  );
}

export function useUpdateInvoiceItem(invoiceId: string, id: string) {
  return useApiMutation(
    (body: Partial<InvoiceItemFormValues>) =>
      apiClient.put<InvoiceItem>(INVOICE_ITEM_API.update(invoiceId, id), body).then((r) => r.data),
    {
      invalidateKeys: [invoiceItemKeys.all(invoiceId), invoiceItemKeys.detail(invoiceId, id)],
      successMessage: "Invoice item updated successfully.",
      redirectPath: `/invoice-items?invoice_id=${invoiceId}`,
      errorMessage: "Failed to update invoice item",
    }
  );
}

export function useDeleteInvoiceItem(invoiceId: string) {
  return useApiMutation(
    (id: string) => apiClient.delete(INVOICE_ITEM_API.delete(invoiceId, id)).then(() => id),
    {
      invalidateKeys: [invoiceItemKeys.all(invoiceId)],
      successMessage: "Invoice item deleted.",
      errorMessage: "Failed to delete invoice item",
    }
  );
}
