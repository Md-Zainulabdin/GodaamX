"use client";

import { DataTable } from "@/components/tables/data-table";
import { INVOICE_ITEM_COLUMNS, actionsColumn } from "@/constants/table.constants";
import { useInvoiceItems, useDeleteInvoiceItem } from "@/app/(dashboard)/invoice-items/_hook/use-invoice-items";
import { InvoiceItem } from "@/types/global";

export function InvoiceItemTable() {
  const { data: items, isLoading } = useInvoiceItems();
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteInvoiceItem();

  const columns = [
    ...INVOICE_ITEM_COLUMNS,
    actionsColumn<InvoiceItem>({
      basePath: "/invoice-items/update",
      idKey: "invoice_item_id",
      onDelete: deleteItem,
      isDeleting,
    }),
  ];

  return <DataTable columns={columns} data={items ?? []} isLoading={isLoading} />;
}
