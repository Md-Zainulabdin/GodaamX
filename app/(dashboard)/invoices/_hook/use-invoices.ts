import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient, type ApiError } from "@/lib/axios";
import { Invoice } from "@/types/global";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { INVOICE_API } from "@/constants/api.constants";
import { InvoiceFormValues } from "@/schemas/schemas";

/* =========================================================
   Invoice Keys
   ========================================================= */

export const invoiceKeys = {
  all: ["invoices"] as const,
  detail: (id: string) => ["invoices", id] as const,
};

/* =========================================================
   Invoice List
   ========================================================= */

export function useInvoices() {
  return useQuery({
    queryKey: invoiceKeys.all,
    queryFn: async () => {
      const res = await apiClient.get<Invoice[]>(INVOICE_API.list);
      return res.data;
    },
  });
}

/* =========================================================
   Invoice Detail
   ========================================================= */

export function useInvoice(id: string) {
  return useQuery({
    queryKey: invoiceKeys.detail(id),
    queryFn: async () => {
      const res = await apiClient.get<Invoice>(INVOICE_API.detail(id));
      return res.data;
    },
    enabled: !!id,
  });
}

/* =========================================================
   Create Invoice
   ========================================================= */

export function useCreateInvoice() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: InvoiceFormValues) => {
      const res = await apiClient.post<Invoice>(INVOICE_API.create, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
      toast.success("Invoice created successfully.");
      router.push("/invoices");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to create invoice", { description: err.message });
    },
  });
}

/* =========================================================
   Update Invoice
   ========================================================= */

export function useUpdateInvoice(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: InvoiceFormValues) => {
      const res = await apiClient.put<Invoice>(INVOICE_API.update(id), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
      queryClient.invalidateQueries({ queryKey: invoiceKeys.detail(id) });
      toast.success("Invoice updated successfully.");
      router.push("/invoices");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to update invoice", { description: err.message });
    },
  });
}

/* =========================================================
   Delete Invoice
   ========================================================= */

export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(INVOICE_API.delete(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
      toast.success("Invoice deleted.");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to delete invoice", { description: err.message });
    },
  });
}
