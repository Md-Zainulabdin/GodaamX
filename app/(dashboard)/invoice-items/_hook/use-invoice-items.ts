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
  all: ["invoice-items"] as const,
  detail: (id: string) => ["invoice-items", id] as const,
};

/* =========================================================
   Invoice Item List
   ========================================================= */

export function useInvoiceItems() {
  return useQuery({
    queryKey: invoiceItemKeys.all,
    queryFn: async () => {
      const res = await apiClient.get<InvoiceItem[]>(INVOICE_ITEM_API.list);
      return res.data;
    },
  });
}

/* =========================================================
   Invoice Item Detail
   ========================================================= */

export function useInvoiceItem(id: string) {
  return useQuery({
    queryKey: invoiceItemKeys.detail(id),
    queryFn: async () => {
      const res = await apiClient.get<InvoiceItem>(INVOICE_ITEM_API.detail(id));
      return res.data;
    },
    enabled: !!id,
  });
}

/* =========================================================
   Create Invoice Item
   ========================================================= */

export function useCreateInvoiceItem() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: InvoiceItemFormValues) => {
      const res = await apiClient.post<InvoiceItem>(INVOICE_ITEM_API.create, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceItemKeys.all });
      toast.success("Invoice item added successfully.");
      router.push("/invoice-items");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to add invoice item", { description: err.message });
    },
  });
}

/* =========================================================
   Update Invoice Item
   ========================================================= */

export function useUpdateInvoiceItem(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: InvoiceItemFormValues) => {
      const res = await apiClient.put<InvoiceItem>(INVOICE_ITEM_API.update(id), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceItemKeys.all });
      queryClient.invalidateQueries({ queryKey: invoiceItemKeys.detail(id) });
      toast.success("Invoice item updated successfully.");
      router.push("/invoice-items");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to update invoice item", { description: err.message });
    },
  });
}

/* =========================================================
   Delete Invoice Item
   ========================================================= */

export function useDeleteInvoiceItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(INVOICE_ITEM_API.delete(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceItemKeys.all });
      toast.success("Invoice item deleted.");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to delete invoice item", { description: err.message });
    },
  });
}
