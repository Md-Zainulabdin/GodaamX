import { apiClient } from "@/lib/axios";
import { Supplier } from "@/types/global";
import { SUPPLIER_API } from "@/constants/api.constants";
import { SupplierFormValues } from "@/schemas/schemas";
import { useApiQuery, useApiMutation } from "@/hooks/use-api-factory";

/* =========================================================
   Suppliers Key
   ========================================================= */

export const supplierKeys = {
  all: ["suppliers"] as const,
  detail: (id: string) => ["suppliers", id] as const,
};

/* =========================================================
   Suppliers Hooks
   ========================================================= */

export function useSuppliers() {
  return useApiQuery<Supplier[]>(supplierKeys.all, SUPPLIER_API.list);
}

export function useSupplier(id: string) {
  return useApiQuery<Supplier>(supplierKeys.detail(id), SUPPLIER_API.detail(id), { enabled: !!id });
}

export function useCreateSupplier() {
  return useApiMutation(
    (body: SupplierFormValues) => apiClient.post<Supplier>(SUPPLIER_API.create, body).then((r) => r.data),
    {
      invalidateKeys: [supplierKeys.all],
      successMessage: "Supplier created successfully.",
      redirectPath: "/suppliers",
      errorMessage: "Failed to create supplier",
    }
  );
}

export function useUpdateSupplier(id: string) {
  return useApiMutation(
    (body: Partial<SupplierFormValues>) => apiClient.put<Supplier>(SUPPLIER_API.put(id), body).then((r) => r.data),
    {
      invalidateKeys: [supplierKeys.all, supplierKeys.detail(id)],
      successMessage: "Supplier updated successfully.",
      redirectPath: "/suppliers",
      errorMessage: "Failed to update supplier",
    }
  );
}

export function useDeleteSupplier() {
  return useApiMutation(
    (id: string) => apiClient.delete(SUPPLIER_API.delete(id)).then(() => id),
    {
      invalidateKeys: [supplierKeys.all],
      successMessage: "Supplier deleted.",
      errorMessage: "Failed to delete supplier",
    }
  );
}
