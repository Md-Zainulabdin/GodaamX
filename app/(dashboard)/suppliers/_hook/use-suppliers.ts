import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/axios";
import { Supplier } from "@/types/global";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SUPPLIER_API } from "@/constants/api.constants";
import { SupplierFormValues } from "@/schemas/schemas";

/* =========================================================
   Suppliers Key
   ========================================================= */

export const supplierKeys = {
  all: ["suppliers"] as const,
  detail: (id: string) => ["suppliers", id] as const,
};

/* =========================================================
   List Suppliers
   ========================================================= */

export function useSuppliers() {
  return useQuery({
    queryKey: supplierKeys.all,
    queryFn: async () => {
      const res = await apiClient.get<Supplier[]>(SUPPLIER_API.list);
      return res.data;
    },
  });
}

/* =========================================================
   Suppliers Detail
   ========================================================= */

export function useSupplier(id: string) {
  return useQuery({
    queryKey: supplierKeys.detail(id),
    queryFn: async () => {
      const res = await apiClient.get<Supplier>(SUPPLIER_API.detail(id));
      return res.data;
    },
    enabled: !!id, // don't fetch if id is empty
  });
}

/* =========================================================
   Create Supplier
   ========================================================= */

export function useCreateSupplier() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: SupplierFormValues) => {
      const res = await apiClient.post<Supplier>(SUPPLIER_API.create, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supplierKeys.all });
      toast.success("Supplier created successfully.");
      router.push("/suppliers");
    },

    onError: (err: any) => {
      toast.error("Failed to create supplier", { description: err.message });
    },
  });
}

/* =========================================================
   Update Supplier
   ========================================================= */

export function useUpdateSupplier(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: Partial<Supplier>) => {
      const res = await apiClient.patch<Supplier>(SUPPLIER_API.patch(id), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supplierKeys.all });
      queryClient.invalidateQueries({ queryKey: supplierKeys.detail(id) });
      toast.success("Supplier updated successfully.");
      router.push("/suppliers");
    },
    onError: (err: any) => {
      toast.error("Failed to update supplier", { description: err.message });
    },
  });
}

/* =========================================================
   Delete Supplier
   ========================================================= */

export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(SUPPLIER_API.delete(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supplierKeys.all });
      toast.success("Supplier deleted.");
    },
    onError: (err: any) => {
      toast.error("Failed to delete supplier", { description: err.message });
    },
  });
}
