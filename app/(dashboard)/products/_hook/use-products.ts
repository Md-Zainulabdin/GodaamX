import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/axios";
import { Product } from "@/types/global";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PRODUCT_API } from "@/constants/api.constants";
import { ProductFormValues } from "@/schemas/schemas";

/* =========================================================
   Products Keys
   ========================================================= */

export const productKeys = {
  all: ["products"] as const,
  detail: (id: string) => ["products", id] as const,
};

/* =========================================================
   List Products
   ========================================================= */

export function useProducts() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: async () => {
      const res = await apiClient.get<Product[]>(PRODUCT_API.list);
      return res.data;
    },
  });
}

/* =========================================================
   Product Detail
   ========================================================= */

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      const res = await apiClient.get<Product>(PRODUCT_API.detail(id));
      return res.data;
    },
    enabled: !!id,
  });
}

/* =========================================================
   Create Product
   ========================================================= */

export function useCreateProduct() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: ProductFormValues) => {
      const res = await apiClient.post<Product>(PRODUCT_API.create, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success("Product created successfully.");
      router.push("/products");
    },
    onError: (err: any) => {
      toast.error("Failed to create product", { description: err.message });
    },
  });
}

/* =========================================================
   Update Product
   ========================================================= */

export function useUpdateProduct(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: ProductFormValues) => {
      const res = await apiClient.patch<Product>(PRODUCT_API.patch(id), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
      toast.success("Product updated successfully.");
      router.push("/products");
    },
    onError: (err: any) => {
      toast.error("Failed to update product", { description: err.message });
    },
  });
}

/* =========================================================
   Delete Product
   ========================================================= */

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(PRODUCT_API.delete(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success("Product deleted.");
    },
    onError: (err: any) => {
      toast.error("Failed to delete product", { description: err.message });
    },
  });
}
