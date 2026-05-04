"use client";

import { DataTable } from "@/components/tables/data-table";
import { PURCHASE_ORDER_COLUMNS, actionsColumn } from "@/constants/table.constants";
import { usePurchaseOrders, useDeletePurchaseOrder } from "@/app/(dashboard)/purchase-orders/_hook/use-purchase-orders";
import { PurchaseOrder } from "@/types/global";

export function PurchaseOrderTable() {
  const { data: purchaseOrders, isLoading } = usePurchaseOrders();
  const { mutate: deletePurchaseOrder, isPending: isDeleting } = useDeletePurchaseOrder();

  const columns = [
    ...PURCHASE_ORDER_COLUMNS,
    actionsColumn<PurchaseOrder>({
      basePath: "/purchase-orders/update",
      idKey: "po_id",
      onDelete: deletePurchaseOrder,
      isDeleting,
    }),
  ];

  return <DataTable columns={columns} data={purchaseOrders ?? []} isLoading={isLoading} />;
}
