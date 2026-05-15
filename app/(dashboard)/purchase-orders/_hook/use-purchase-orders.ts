import { apiClient } from "@/lib/axios";
import { PurchaseOrder } from "@/types/global";
import { PURCHASE_ORDER_API } from "@/constants/api.constants";
import { PurchaseOrderFormValues } from "@/schemas/schemas";
import { useApiQuery, useApiMutation } from "@/hooks/use-api-factory";

/* =========================================================
   Purchase Orders Keys
   ========================================================= */

export const purchaseOrderKeys = {
  all: ["purchase-orders"] as const,
  detail: (id: string) => ["purchase-orders", id] as const,
};

/* =========================================================
   Purchase Orders Hooks
   ========================================================= */

export function usePurchaseOrders() {
  return useApiQuery<PurchaseOrder[]>(purchaseOrderKeys.all, PURCHASE_ORDER_API.list);
}

export function usePurchaseOrder(id: string) {
  return useApiQuery<PurchaseOrder>(purchaseOrderKeys.detail(id), PURCHASE_ORDER_API.detail(id), { enabled: !!id });
}

export function useCreatePurchaseOrder() {
  return useApiMutation(
    (body: PurchaseOrderFormValues) => apiClient.post<PurchaseOrder>(PURCHASE_ORDER_API.create, body).then((r) => r.data),
    {
      invalidateKeys: [purchaseOrderKeys.all],
      successMessage: "Purchase order created successfully.",
      redirectPath: "/purchase-orders",
      errorMessage: "Failed to create purchase order",
    }
  );
}

export function useUpdatePurchaseOrder(id: string) {
  return useApiMutation(
    (body: Partial<PurchaseOrderFormValues>) => apiClient.put<PurchaseOrder>(PURCHASE_ORDER_API.update(id), body).then((r) => r.data),
    {
      invalidateKeys: [purchaseOrderKeys.all, purchaseOrderKeys.detail(id)],
      successMessage: "Purchase order updated successfully.",
      redirectPath: "/purchase-orders",
      errorMessage: "Failed to update purchase order",
    }
  );
}

export function useDeletePurchaseOrder() {
  return useApiMutation(
    (id: string) => apiClient.delete(PURCHASE_ORDER_API.delete(id)).then(() => id),
    {
      invalidateKeys: [purchaseOrderKeys.all],
      successMessage: "Purchase order deleted.",
      errorMessage: "Failed to delete purchase order",
    }
  );
}
