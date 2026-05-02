import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient, type ApiError } from "@/lib/axios";
import { PurchaseOrderItem } from "@/types/global";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { POI_API } from "@/constants/api.constants";
import { PurchaseOrderItemFormValues } from "@/schemas/schemas";

/* =========================================================
   POI Keys
   ========================================================= */

export const poiKeys = {
  all: (poId: string) => ["poi", poId] as const,
  detail: (poId: string, itemId: string) => ["poi", poId, itemId] as const,
};

/* =========================================================
   POI List
   ========================================================= */

export function usePOI(poId: string) {
  return useQuery({
    queryKey: poiKeys.all(poId),
    queryFn: async () => {
      const res = await apiClient.get<PurchaseOrderItem[]>(POI_API.list(poId));
      return res.data;
    },
    enabled: !!poId,
  });
}

/* =========================================================
   POI Detail
   ========================================================= */

export function usePOIDetail(poId: string, itemId: string) {
  return useQuery({
    queryKey: poiKeys.detail(poId, itemId),
    queryFn: async () => {
      const res = await apiClient.get<PurchaseOrderItem>(POI_API.detail(poId, itemId));
      return res.data;
    },
    enabled: !!poId && !!itemId,
  });
}

/* =========================================================
   Create POI
   ========================================================= */

export function useCreatePOI(poId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: PurchaseOrderItemFormValues) => {
      const res = await apiClient.post<PurchaseOrderItem>(POI_API.create(poId), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: poiKeys.all(poId) });
      toast.success("Item added successfully.");
      router.push("/purchase-order-items");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to add item", { description: err.message });
    },
  });
}

/* =========================================================
   Update POI
   ========================================================= */

export function useUpdatePOI(poId: string, itemId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: PurchaseOrderItemFormValues) => {
      const res = await apiClient.put<PurchaseOrderItem>(POI_API.update(poId, itemId), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: poiKeys.all(poId) });
      queryClient.invalidateQueries({ queryKey: poiKeys.detail(poId, itemId) });
      toast.success("Item updated successfully.");
      router.push("/purchase-order-items");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to update item", { description: err.message });
    },
  });
}

/* =========================================================
   Delete POI
   ========================================================= */

export function useDeletePOI(poId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      await apiClient.delete(POI_API.delete(poId, itemId));
      return itemId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: poiKeys.all(poId) });
      toast.success("Item removed.");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to remove item", { description: err.message });
    },
  });
}
