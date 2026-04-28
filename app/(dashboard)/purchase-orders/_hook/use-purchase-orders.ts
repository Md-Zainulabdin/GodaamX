import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient, type ApiError } from "@/lib/axios";
import { PurchaseOrder } from "@/types/global";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PURCHASE_ORDER_API } from "@/constants/api.constants";
import { PurchaseOrderFormValues } from "@/schemas/schemas";

/* =========================================================
   Purchase Orders Keys
   ========================================================= */

export const purchaseOrderKeys = {
  all: ["purchase-orders"] as const,
  detail: (id: string) => ["purchase-orders", id] as const,
};

/* =========================================================
   Purchase Orders List
   ========================================================= */

export function usePurchaseOrders() {
  return useQuery({
    queryKey: purchaseOrderKeys.all,
    queryFn: async () => {
      const res = await apiClient.get<PurchaseOrder[]>(PURCHASE_ORDER_API.list);
      return res.data;
    },
  });
}

/* =========================================================
   Purchase Order Detail
   ========================================================= */

export function usePurchaseOrder(id: string) {
  return useQuery({
    queryKey: purchaseOrderKeys.detail(id),
    queryFn: async () => {
      const res = await apiClient.get<PurchaseOrder>(PURCHASE_ORDER_API.detail(id));
      return res.data;
    },
    enabled: !!id,
  });
}

/* =========================================================
   Create Purchase Order
   ========================================================= */

export function useCreatePurchaseOrder() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: PurchaseOrderFormValues) => {
      const res = await apiClient.post<PurchaseOrder>(PURCHASE_ORDER_API.create, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchaseOrderKeys.all });
      toast.success("Purchase order created successfully.");
      router.push("/purchase-orders");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to create purchase order", { description: err.message });
    },
  });
}

/* =========================================================
   Update Purchase Order
   ========================================================= */

export function useUpdatePurchaseOrder(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: PurchaseOrderFormValues) => {
      const res = await apiClient.put<PurchaseOrder>(PURCHASE_ORDER_API.update(id), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchaseOrderKeys.all });
      queryClient.invalidateQueries({ queryKey: purchaseOrderKeys.detail(id) });
      toast.success("Purchase order updated successfully.");
      router.push("/purchase-orders");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to update purchase order", { description: err.message });
    },
  });
}

/* =========================================================
   Delete Purchase Order
   ========================================================= */

export function useDeletePurchaseOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(PURCHASE_ORDER_API.delete(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchaseOrderKeys.all });
      toast.success("Purchase order deleted.");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to delete purchase order", { description: err.message });
    },
  });
}
