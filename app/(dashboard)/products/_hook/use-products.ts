import { apiClient } from "@/lib/axios";
import { Product } from "@/types/global";
import { PRODUCT_API } from "@/constants/api.constants";
import { ProductFormValues } from "@/schemas/schemas";
import { useApiQuery, useApiMutation } from "@/hooks/use-api-factory";

/* =========================================================
   Products Keys
   ========================================================= */

export const productKeys = {
  all: ["products"] as const,
  detail: (id: string) => ["products", id] as const,
};

/* =========================================================
   Products Hooks
   ========================================================= */

export function useProducts() {
  return useApiQuery<Product[]>(productKeys.all, PRODUCT_API.list);
}

export function useProduct(id: string) {
  return useApiQuery<Product>(productKeys.detail(id), PRODUCT_API.detail(id), { enabled: !!id });
}

export function useCreateProduct() {
  return useApiMutation(
    (body: ProductFormValues) => apiClient.post<Product>(PRODUCT_API.create, body).then((r) => r.data),
    {
      invalidateKeys: [productKeys.all],
      successMessage: "Product created successfully.",
      redirectPath: "/products",
      errorMessage: "Failed to create product",
    }
  );
}

export function useUpdateProduct(id: string) {
  return useApiMutation(
    (body: Partial<ProductFormValues>) => apiClient.put<Product>(PRODUCT_API.put(id), body).then((r) => r.data),
    {
      invalidateKeys: [productKeys.all, productKeys.detail(id)],
      successMessage: "Product updated successfully.",
      redirectPath: "/products",
      errorMessage: "Failed to update product",
    }
  );
}

export function useDeleteProduct() {
  return useApiMutation(
    (id: string) => apiClient.delete(PRODUCT_API.delete(id)).then(() => id),
    {
      invalidateKeys: [productKeys.all],
      successMessage: "Product deleted.",
      errorMessage: "Failed to delete product",
    }
  );
}
