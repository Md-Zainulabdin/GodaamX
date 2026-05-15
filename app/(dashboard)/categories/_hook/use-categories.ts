import { apiClient } from "@/lib/axios";
import { Category } from "@/types/global";
import { CATEGORY_API } from "@/constants/api.constants";
import { CategoryFormValues } from "@/schemas/schemas";
import { useApiQuery, useApiMutation } from "@/hooks/use-api-factory";

/* =========================================================
   Categories Keys
   ========================================================= */

export const categoryKeys = {
  all: ["categories"] as const,
  detail: (id: string) => ["categories", id] as const,
};

/* =========================================================
   Categories Hooks
   ========================================================= */

export function useCategories() {
  return useApiQuery<Category[]>(categoryKeys.all, CATEGORY_API.list);
}

export function useCategory(id: string) {
  return useApiQuery<Category>(categoryKeys.detail(id), CATEGORY_API.detail(id), { enabled: !!id });
}

export function useCreateCategory() {
  return useApiMutation(
    (body: CategoryFormValues) => apiClient.post<Category>(CATEGORY_API.create, body).then((r) => r.data),
    {
      invalidateKeys: [categoryKeys.all],
      successMessage: "Category created successfully.",
      redirectPath: "/categories",
      errorMessage: "Failed to create category",
    }
  );
}

export function useUpdateCategory(id: string) {
  return useApiMutation(
    (body: Partial<CategoryFormValues>) => apiClient.put<Category>(CATEGORY_API.put(id), body).then((r) => r.data),
    {
      invalidateKeys: [categoryKeys.all, categoryKeys.detail(id)],
      successMessage: "Category updated successfully.",
      redirectPath: "/categories",
      errorMessage: "Failed to update category",
    }
  );
}

export function useDeleteCategory() {
  return useApiMutation(
    (id: string) => apiClient.delete(CATEGORY_API.delete(id)).then(() => id),
    {
      invalidateKeys: [categoryKeys.all],
      successMessage: "Category deleted.",
      errorMessage: "Failed to delete category",
    }
  );
}
