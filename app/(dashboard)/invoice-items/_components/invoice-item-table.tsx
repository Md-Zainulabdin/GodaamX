"use client";

import { DataTable } from "@/components/tables/data-table";
import { INVOICE_ITEM_COLUMNS } from "@/constants/table.constants";
import { useInvoiceItems, useDeleteInvoiceItem } from "@/app/(dashboard)/invoice-items/_hook/use-invoice-items";
import { InvoiceItem } from "@/types/global";

import { useMemo } from "react";
import { DataTableActions } from "@/components/tables/data-table-actions";

export function InvoiceItemTable({ invoiceId }: { invoiceId: string }) {
  const { data: items, isLoading } = useInvoiceItems(invoiceId);
  const { mutate: deleteItem, isPending: isDeleting, variables: deletingId } = useDeleteInvoiceItem(invoiceId);

  const columns = useMemo(() => [
    ...INVOICE_ITEM_COLUMNS,
    {
      accessorKey: "__actions",
      header: "Actions",
      cell: ({ row }: { row: { original: InvoiceItem } }) => (
        <DataTableActions
          id={row.original.invoice_item_id}
          editPath={`/invoice-items/update/${row.original.invoice_item_id}?invoice_id=${invoiceId}`}
          onDelete={deleteItem}
          isDeleting={isDeleting && deletingId === row.original.invoice_item_id}
        />
      ),
    },
  ], [invoiceId, deleteItem, isDeleting, deletingId]);

  return <DataTable columns={columns} data={items ?? []} isLoading={isLoading} searchKey="product.product_name" />;
}
