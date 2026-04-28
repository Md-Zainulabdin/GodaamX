import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient, type ApiError } from "@/lib/axios";
import { Inventory } from "@/types/global";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { INVENTORY_API } from "@/constants/api.constants";
import { InventoryFormValues } from "@/schemas/schemas";

/* =========================================================
   Inventory Keys
   ========================================================= */

export const inventoryKeys = {
  all: ["inventory"] as const,
  detail: (id: string) => ["inventory", id] as const,
};

/* =========================================================
   Inventory List
   ========================================================= */

export function useInventoryList() {
  return useQuery({
    queryKey: inventoryKeys.all,
    queryFn: async () => {
      const res = await apiClient.get<Inventory[]>(INVENTORY_API.list);
      return res.data;
    },
  });
}

/* =========================================================
   Inventory Detail
   ========================================================= */

export function useInventory(id: string) {
  return useQuery({
    queryKey: inventoryKeys.detail(id),
    queryFn: async () => {
      const res = await apiClient.get<Inventory>(INVENTORY_API.detail(id));
      return res.data;
    },
    enabled: !!id,
  });
}

/* =========================================================
   Create Inventory
   ========================================================= */

export function useCreateInventory() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: InventoryFormValues) => {
      const res = await apiClient.post<Inventory>(INVENTORY_API.create, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
      toast.success("Inventory created successfully.");
      router.push("/inventory");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to create inventory", { description: err.message });
    },
  });
}

/* =========================================================
   Update Inventory
   ========================================================= */

export function useUpdateInventory(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: InventoryFormValues) => {
      const res = await apiClient.put<Inventory>(INVENTORY_API.update(id), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
      queryClient.invalidateQueries({ queryKey: inventoryKeys.detail(id) });
      toast.success("Inventory updated successfully.");
      router.push("/inventory");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to update inventory", { description: err.message });
    },
  });
}

/* =========================================================
   Delete Inventory
   ========================================================= */

export function useDeleteInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(INVENTORY_API.delete(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
      toast.success("Inventory deleted.");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to delete inventory", { description: err.message });
    },
  });
}
