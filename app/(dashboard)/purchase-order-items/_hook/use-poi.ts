import { apiClient } from "@/lib/axios";
import { PurchaseOrderItem } from "@/types/global";
import { POI_API } from "@/constants/api.constants";
import { PurchaseOrderItemFormValues } from "@/schemas/schemas";
import { useApiQuery, useApiMutation } from "@/hooks/use-api-factory";

/* =========================================================
   POI Keys
   ========================================================= */

export const poiKeys = {
  all: (poId: string) => ["poi", poId] as const,
  detail: (poId: string, itemId: string) => ["poi", poId, itemId] as const,
};

/* =========================================================
   POI Hooks
   ========================================================= */

export function usePOI(poId: string) {
  return useApiQuery<PurchaseOrderItem[]>(poiKeys.all(poId), POI_API.list(poId), { enabled: !!poId });
}

export function usePOIDetail(poId: string, itemId: string) {
  return useApiQuery<PurchaseOrderItem>(poiKeys.detail(poId, itemId), POI_API.detail(poId, itemId), {
    enabled: !!poId && !!itemId,
  });
}

export function useCreatePOI(poId: string) {
  return useApiMutation(
    (body: PurchaseOrderItemFormValues) => apiClient.post<PurchaseOrderItem>(POI_API.create(poId), body).then((r) => r.data),
    {
      invalidateKeys: [poiKeys.all(poId)],
      successMessage: "Item added successfully.",
      redirectPath: "/purchase-order-items",
      errorMessage: "Failed to add item",
    }
  );
}

export function useUpdatePOI(poId: string, itemId: string) {
  return useApiMutation(
    (body: Partial<PurchaseOrderItemFormValues>) =>
      apiClient.put<PurchaseOrderItem>(POI_API.update(poId, itemId), body).then((r) => r.data),
    {
      invalidateKeys: [poiKeys.all(poId), poiKeys.detail(poId, itemId)],
      successMessage: "Item updated successfully.",
      redirectPath: "/purchase-order-items",
      errorMessage: "Failed to update item",
    }
  );
}

export function useDeletePOI(poId: string) {
  return useApiMutation(
    (itemId: string) => apiClient.delete(POI_API.delete(poId, itemId)).then(() => itemId),
    {
      invalidateKeys: [poiKeys.all(poId)],
      successMessage: "Item removed.",
      errorMessage: "Failed to remove item",
    }
  );
}
