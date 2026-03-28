import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/axios";
import { Category } from "@/types/global";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORY_API } from "@/constants/api.constants";
import { CategoryFormValues } from "@/schemas/schemas";

/* =========================================================
   Categories Keys
   ========================================================= */

export const categoryKeys = {
  all: ["categories"] as const,
  detail: (id: string) => ["categories", id] as const,
};

/* =========================================================
   List Categories
   ========================================================= */

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: async () => {
      const res = await apiClient.get<Category[]>(CATEGORY_API.list);
      return res.data;
    },
  });
}

/* =========================================================
   Category Detail
   ========================================================= */

export function useCategory(id: string) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: async () => {
      const res = await apiClient.get<Category>(CATEGORY_API.detail(id));
      return res.data;
    },
    enabled: !!id,
  });
}

/* =========================================================
   Create Category
   ========================================================= */

export function useCreateCategory() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CategoryFormValues) => {
      const res = await apiClient.post<Category>(CATEGORY_API.create, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success("Category created successfully.");
      router.push("/categories");
    },
    onError: (err: any) => {
      toast.error("Failed to create category", { description: err.message });
    },
  });
}

/* =========================================================
   Update Category
   ========================================================= */

export function useUpdateCategory(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CategoryFormValues) => {
      const res = await apiClient.patch<Category>(CATEGORY_API.patch(id), body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(id) });
      toast.success("Category updated successfully.");
      router.push("/categories");
    },
    onError: (err: any) => {
      toast.error("Failed to update category", { description: err.message });
    },
  });
}

/* =========================================================
   Delete Category
   ========================================================= */

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(CATEGORY_API.delete(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success("Category deleted.");
    },
    onError: (err: any) => {
      toast.error("Failed to delete category", { description: err.message });
    },
  });
}
