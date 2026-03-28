"use client";

import { DynamicForm } from "@/components/forms/dynamic-form";
import { CATEGORY_FORM_FIELDS } from "@/constants/form.constants";
import { categorySchema, CategoryFormValues } from "@/schemas/schemas";
import {
  useCreateCategory,
  useUpdateCategory,
  useCategory,
  useCategories,
} from "@/app/(dashboard)/categories/_hook/use-categories";

type Props = { mode: "create" } | { mode: "edit"; id: string };

export function CategoryForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : "";

  const { data: categories } = useCategories();
  const { data: category, isLoading } = useCategory(id);
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory(id);

  const parentOptions =
    categories
      ?.filter((c) => c.category_id !== id)
      .map((c) => ({ label: c.category_name, value: String(c.category_id) })) ?? [];

  function handleSubmit(data: CategoryFormValues) {
    isEdit ? updateCategory(data) : createCategory(data);
  }

  if (isEdit && isLoading) return <p className="text-muted-foreground">Loading...</p>;
  if (isEdit && !category) return <p className="text-muted-foreground">Category not found.</p>;

  return (
    <DynamicForm<CategoryFormValues>
      schema={categorySchema}
      fields={CATEGORY_FORM_FIELDS}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Category" : "Create Category"}
      isLoading={isCreating || isUpdating}
      dynamicOptions={{ parent_category_id: parentOptions }}
      defaultValues={
        isEdit && category
          ? {
              category_name: category?.category_name,
              description: category?.description ?? "",
              parent_category_id: category?.parent_category_id ?? "",
            }
          : undefined
      }
    />
  );
}
