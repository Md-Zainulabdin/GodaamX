"use client";

import { DataTable } from "@/components/tables/data-table";
import { CATEGORY_COLUMNS, actionsColumn } from "@/constants/table.constants";
import { useCategories, useDeleteCategory } from "@/app/(dashboard)/categories/_hook/use-categories";
import { Category } from "@/types/global";

export function CategoryTable() {
  const { data: categories, isLoading } = useCategories();
  const { mutate: deleteCategory, isPending: isDeleting, variables: deletingId } = useDeleteCategory();

  const columns = [
    ...CATEGORY_COLUMNS,
    actionsColumn<Category>({
      basePath: "/categories/update",
      idKey: "category_id",
      onDelete: deleteCategory,
      isDeleting,
      deletingId,
    }),
  ];

  return <DataTable columns={columns} data={categories ?? []} isLoading={isLoading} searchKey="category_name" />;
}
