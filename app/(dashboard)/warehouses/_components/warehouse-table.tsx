"use client";

import { DataTable } from "@/components/tables/data-table";
import { WAREHOUSE_COLUMNS, actionsColumn } from "@/constants/table.constants";
import { useWarehouses, useDeleteWarehouse } from "@/app/(dashboard)/warehouses/_hook/use-warehouses";
import { Warehouse } from "@/types/global";

export function WarehouseTable() {
  const { data: warehouses, isLoading } = useWarehouses();
  const { mutate: deleteWarehouse, isPending: isDeleting } = useDeleteWarehouse();

  const columns = [
    ...WAREHOUSE_COLUMNS,
    actionsColumn<Warehouse>({
      basePath: "/warehouses/update",
      idKey: "warehouse_id",
      onDelete: deleteWarehouse,
      isDeleting,
    }),
  ];

  return <DataTable columns={columns} data={warehouses ?? []} isLoading={isLoading} searchKey="warehouse_name" />;
}
