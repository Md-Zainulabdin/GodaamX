import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient, type ApiError } from "@/lib/axios";
import { InvoiceItem } from "@/types/global";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { INVOICE_ITEM_API } from "@/constants/api.constants";
import { InvoiceItemFormValues } from "@/schemas/schemas";

/* =========================================================
   Invoice Item Keys
   ========================================================= */

export const invoiceItemKeys = {
  all: (invoiceId?: string) => ["invoice-items", invoiceId] as const,
  detail: (invoiceId: string, id: string) => ["invoice-items", invoiceId, id] as const,
};

/* =========================================================
   Invoice Item List
   ========================================================= */

export function useInvoiceItems(invoiceId: string) {
  return useQuery({
    queryKey: invoiceItemKeys.all(invoiceId),
    queryFn: async () => {
      const res = await apiClient.get<InvoiceItem[]>(INVOICE_ITEM_API.list(invoiceId));
      return res.data;
    },
    enabled: !!invoiceId,
  });
}

/* =========================================================
   Invoice Item Detail
   ========================================================= */

export function useInvoiceItem(invoiceId: string, id: string) {
  return useQuery({
    queryKey: invoiceItemKeys.detail(invoiceId, id),
    queryFn: async () => {
      const res = await apiClient.get<InvoiceItem>(INVOICE_ITEM_API.detail(invoiceId, id));
      return res.data;
    },
    enabled: !!invoiceId && !!id,
  });
}

/* =========================================================
   Create Invoice Item
   ========================================================= */

export function useCreateInvoiceItem(invoiceId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: InvoiceItemFormValues) => {
      const res = await apiClient.post<InvoiceItem>(INVOICE_ITEM_API.create(invoiceId), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceItemKeys.all(invoiceId) });
      toast.success("Invoice item added successfully.");
      router.push(`/invoice-items?invoice_id=${invoiceId}`);
    },
    onError: (err: ApiError) => {
      toast.error("Failed to add invoice item", { description: err.message });
    },
  });
}

/* =========================================================
   Update Invoice Item
   ========================================================= */

export function useUpdateInvoiceItem(invoiceId: string, id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: InvoiceItemFormValues) => {
      const res = await apiClient.put<InvoiceItem>(INVOICE_ITEM_API.update(invoiceId, id), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceItemKeys.all(invoiceId) });
      queryClient.invalidateQueries({ queryKey: invoiceItemKeys.detail(invoiceId, id) });
      toast.success("Invoice item updated successfully.");
      router.push(`/invoice-items?invoice_id=${invoiceId}`);
    },
    onError: (err: ApiError) => {
      toast.error("Failed to update invoice item", { description: err.message });
    },
  });
}

/* =========================================================
   Delete Invoice Item
   ========================================================= */

export function useDeleteInvoiceItem(invoiceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(INVOICE_ITEM_API.delete(invoiceId, id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceItemKeys.all(invoiceId) });
      toast.success("Invoice item deleted.");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to delete invoice item", { description: err.message });
    },
  });
}
