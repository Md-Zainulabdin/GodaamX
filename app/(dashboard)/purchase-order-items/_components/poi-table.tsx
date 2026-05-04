"use client";

import { DataTable } from "@/components/tables/data-table";
import { DataTableActions } from "@/components/tables/data-table-actions";
import { PURCHASE_ORDER_ITEM_COLUMNS } from "@/constants/table.constants";
import { usePOI, useDeletePOI } from "@/app/(dashboard)/purchase-order-items/_hook/use-poi";
import { PurchaseOrderItem } from "@/types/global";

export function POITable({ poId }: { poId: string }) {
  const { data: items, isLoading } = usePOI(poId);
  const { mutate: deleteItem, isPending: isDeleting } = useDeletePOI(poId);

  const columns = [
    ...PURCHASE_ORDER_ITEM_COLUMNS,
    {
      accessorKey: "__actions",
      header: "Actions",
      cell: ({ row }: { row: { original: PurchaseOrderItem } }) => (
        <DataTableActions
          id={row.original.po_item_id}
          editPath={`/purchase-order-items/update/${row.original.po_item_id}?po_id=${poId}`}
          onDelete={deleteItem}
          isDeleting={isDeleting}
        />
      ),
    },
  ];

  return <DataTable columns={columns} data={items ?? []} isLoading={isLoading} />;
}
