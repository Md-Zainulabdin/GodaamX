import { apiClient } from "@/lib/axios";
import { Inventory } from "@/types/global";
import { INVENTORY_API } from "@/constants/api.constants";
import { InventoryFormValues } from "@/schemas/schemas";
import { useApiQuery, useApiMutation } from "@/hooks/use-api-factory";

/* =========================================================
   Inventory Keys
   ========================================================= */

export const inventoryKeys = {
  all: ["inventory"] as const,
  detail: (id: string) => ["inventory", id] as const,
};

/* =========================================================
   Inventory Hooks
   ========================================================= */

export function useInventoryList() {
  return useApiQuery<Inventory[]>(inventoryKeys.all, INVENTORY_API.list);
}

export function useInventory(id: string) {
  return useApiQuery<Inventory>(inventoryKeys.detail(id), INVENTORY_API.detail(id), { enabled: !!id });
}

export function useCreateInventory() {
  return useApiMutation(
    (body: InventoryFormValues) => apiClient.post<Inventory>(INVENTORY_API.create, body).then((r) => r.data),
    {
      invalidateKeys: [inventoryKeys.all],
      successMessage: "Inventory created successfully.",
      redirectPath: "/inventory",
      errorMessage: "Failed to create inventory",
    }
  );
}

export function useUpdateInventory(id: string) {
  return useApiMutation(
    (body: Partial<InventoryFormValues>) => apiClient.put<Inventory>(INVENTORY_API.update(id), body).then((r) => r.data),
    {
      invalidateKeys: [inventoryKeys.all, inventoryKeys.detail(id)],
      successMessage: "Inventory updated successfully.",
      redirectPath: "/inventory",
      errorMessage: "Failed to update inventory",
    }
  );
}

export function useDeleteInventory() {
  return useApiMutation(
    (id: string) => apiClient.delete(INVENTORY_API.delete(id)).then(() => id),
    {
      invalidateKeys: [inventoryKeys.all],
      successMessage: "Inventory deleted.",
      errorMessage: "Failed to delete inventory",
    }
  );
}
