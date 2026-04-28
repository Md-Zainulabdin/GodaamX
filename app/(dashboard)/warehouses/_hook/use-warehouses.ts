import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient, type ApiError } from "@/lib/axios";
import { Warehouse } from "@/types/global";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { WAREHOUSE_API } from "@/constants/api.constants";
import { WarehouseFormValues } from "@/schemas/schemas";

/* =========================================================
   Warehouses Key
   ========================================================= */

export const warehouseKeys = {
  all: ["warehouses"] as const,
  detail: (id: string) => ["warehouses", id] as const,
};

/* =========================================================
   Warehouses List
   ========================================================= */

export function useWarehouses() {
  return useQuery({
    queryKey: warehouseKeys.all,
    queryFn: async () => {
      const res = await apiClient.get<Warehouse[]>(WAREHOUSE_API.list);
      return res.data;
    },
  });
}

/* =========================================================
   Warehouse Detail
   ========================================================= */

export function useWarehouse(id: string) {
  return useQuery({
    queryKey: warehouseKeys.detail(id),
    queryFn: async () => {
      const res = await apiClient.get<Warehouse>(WAREHOUSE_API.detail(id));
      return res.data;
    },
    enabled: !!id,
  });
}

/* =========================================================
   Create Warehouse
   ========================================================= */

export function useCreateWarehouse() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: WarehouseFormValues) => {
      const res = await apiClient.post<Warehouse>(WAREHOUSE_API.create, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: warehouseKeys.all });
      toast.success("Warehouse created successfully.");
      router.push("/warehouses");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to create warehouse", { description: err.message });
    },
  });
}

/* =========================================================
   Update Warehouse
   ========================================================= */

export function useUpdateWarehouse(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: WarehouseFormValues) => {
      const res = await apiClient.put<Warehouse>(WAREHOUSE_API.put(id), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: warehouseKeys.all });
      queryClient.invalidateQueries({ queryKey: warehouseKeys.detail(id) });
      toast.success("Warehouse updated successfully.");
      router.push("/warehouses");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to update warehouse", { description: err.message });
    },
  });
}

/* =========================================================
   Delete Warehouse
   ========================================================= */

export function useDeleteWarehouse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(WAREHOUSE_API.delete(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: warehouseKeys.all });
      toast.success("Warehouse deleted.");
    },
    onError: (err: ApiError) => {
      toast.error("Failed to delete warehouse", { description: err.message });
    },
  });
}
