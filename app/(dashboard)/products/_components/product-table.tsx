"use client";

import { DataTable } from "@/components/tables/data-table";
import { PRODUCT_COLUMNS, actionsColumn } from "@/constants/table.constants";
import { useProducts, useDeleteProduct } from "@/app/(dashboard)/products/_hook/use-products";
import { Product } from "@/types/global";

export function ProductTable() {
  const { data: products, isLoading } = useProducts();
  const { mutate: deleteProduct, isPending: isDeleting, variables: deletingId } = useDeleteProduct();

  const columns = [
    ...PRODUCT_COLUMNS,
    actionsColumn<Product>({
      basePath: "/products/update",
      idKey: "product_id",
      onDelete: deleteProduct,
      isDeleting,
      deletingId,
    }),
  ];

  return <DataTable columns={columns} data={products ?? []} isLoading={isLoading} searchKey="product_name" />;
}
