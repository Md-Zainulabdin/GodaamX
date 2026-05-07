"use client";

import { DataTable } from "@/components/tables/data-table";
import { INVOICE_COLUMNS, actionsColumn } from "@/constants/table.constants";
import { useInvoices, useDeleteInvoice } from "@/app/(dashboard)/invoices/_hook/use-invoices";
import { Invoice } from "@/types/global";

export function InvoiceTable() {
  const { data: invoices, isLoading } = useInvoices();
  const { mutate: deleteInvoice, isPending: isDeleting, variables: deletingId } = useDeleteInvoice();

  const columns = [
    ...INVOICE_COLUMNS,
    actionsColumn<Invoice>({
      basePath: "/invoices/update",
      idKey: "invoice_id",
      onDelete: deleteInvoice,
      isDeleting,
      deletingId,
    }),
  ];

  return <DataTable columns={columns} data={invoices ?? []} isLoading={isLoading} searchKey="invoice_number" />;
}
