"use client";

import { useMemo } from "react";
import { DynamicForm } from "@/components/forms/dynamic-form";
import { INVOICE_FORM_FIELDS } from "@/constants/form.constants";
import { invoiceSchema, InvoiceFormValues } from "@/schemas/schemas";
import {
  useCreateInvoice,
  useUpdateInvoice,
  useInvoice,
} from "@/app/(dashboard)/invoices/_hook/use-invoices";
import { useSuppliers } from "@/app/(dashboard)/suppliers/_hook/use-suppliers";
import { usePurchaseOrders } from "@/app/(dashboard)/purchase-orders/_hook/use-purchase-orders";

import { FormSkeleton } from "@/components/forms/form-skeleton";

type Props = { mode: "create" } | { mode: "edit"; id: string };

export function InvoiceForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : "";

  const { data: suppliers } = useSuppliers();
  const { data: purchaseOrders } = usePurchaseOrders();
  const { data: invoice, isLoading } = useInvoice(id);
  const { mutate: createInvoice, isPending: isCreating } = useCreateInvoice();
  const { mutate: updateInvoice, isPending: isUpdating } = useUpdateInvoice(id);

  const supplierOptions =
    suppliers?.map((s) => ({ label: s.supplier_name, value: s.supplier_id })) ?? [];
  const poOptions =
    purchaseOrders?.map((po) => ({
      label: po.order_number || `Order ${po.po_id.slice(0, 8)}`,
      value: po.po_id,
    })) ?? [];

  const defaultValues = useMemo(
    () =>
      isEdit && invoice
        ? {
            supplier_id: invoice.supplier_id,
            po_id: invoice.po_id ?? null,
            invoice_number: invoice.invoice_number ?? "",
            invoice_date: invoice.invoice_date ? new Date(invoice.invoice_date).toISOString().split("T")[0] : "",
            total_amount: invoice.total_amount ? Number(invoice.total_amount) : null,
            status: invoice.status as InvoiceFormValues["status"],
          }
        : undefined,
    [isEdit, invoice]
  );

  function handleSubmit(data: InvoiceFormValues) {
    if (isEdit) {
      updateInvoice(data);
    } else {
      createInvoice(data);
    }
  }

  if (isEdit && isLoading) return <FormSkeleton fieldCount={6} />;
  if (isEdit && !invoice) return <p className="text-muted-foreground">Invoice not found.</p>;

  return (
    <DynamicForm<InvoiceFormValues>
      schema={invoiceSchema}
      fields={INVOICE_FORM_FIELDS}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Invoice" : "Create Invoice"}
      isLoading={isCreating || isUpdating}
      dynamicOptions={{
        supplier_id: supplierOptions,
        po_id: poOptions,
      }}
      defaultValues={defaultValues}
    />
  );
}
