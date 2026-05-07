"use client";

import { DataTable } from "@/components/tables/data-table";
import { INVENTORY_COLUMNS, actionsColumn } from "@/constants/table.constants";
import { useInventoryList, useDeleteInventory } from "@/app/(dashboard)/inventory/_hook/use-inventory";
import { Inventory } from "@/types/global";

export function InventoryTable() {
  const { data: inventory, isLoading } = useInventoryList();
  const { mutate: deleteInventory, isPending: isDeleting, variables: deletingId } = useDeleteInventory();

  const columns = [
    ...INVENTORY_COLUMNS,
    actionsColumn<Inventory>({
      basePath: "/inventory/update",
      idKey: "inventory_id",
      onDelete: deleteInventory,
      isDeleting,
      deletingId,
    }),
  ];

  return <DataTable columns={columns} data={inventory ?? []} isLoading={isLoading} searchKey="product.product_name" />;
}
