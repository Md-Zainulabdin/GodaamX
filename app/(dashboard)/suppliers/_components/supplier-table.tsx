"use client";

import { DataTable } from "@/components/tables/data-table";
import { SUPPLIER_COLUMNS, actionsColumn } from "@/constants/table.constants";
import { useSuppliers, useDeleteSupplier } from "@/app/(dashboard)/suppliers/_hook/use-suppliers";
import { Supplier } from "@/types/global";

export function SupplierTable() {
  const { data: suppliers, isLoading } = useSuppliers();
  const { mutate: deleteSupplier, isPending: isDeleting } = useDeleteSupplier();

  const columns = [
    ...SUPPLIER_COLUMNS,
    actionsColumn<Supplier>({
      basePath: "/suppliers/update",
      idKey: "supplier_id",
      onDelete: deleteSupplier,
      isDeleting,
    }),
  ];

  return <DataTable columns={columns} data={suppliers ?? []} isLoading={isLoading} searchKey="supplier_name" />;
}
