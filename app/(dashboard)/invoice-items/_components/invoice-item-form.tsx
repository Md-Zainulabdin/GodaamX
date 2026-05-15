"use client";

import { useMemo } from "react";
import { DynamicForm } from "@/components/forms/dynamic-form";
import { INVOICE_ITEM_FORM_FIELDS } from "@/constants/form.constants";
import { invoiceItemSchema, InvoiceItemFormValues } from "@/schemas/schemas";
import {
  useCreateInvoiceItem,
  useUpdateInvoiceItem,
  useInvoiceItem,
} from "@/app/(dashboard)/invoice-items/_hook/use-invoice-items";
import { useInvoices } from "@/app/(dashboard)/invoices/_hook/use-invoices";
import { useProducts } from "@/app/(dashboard)/products/_hook/use-products";

import { FormSkeleton } from "@/components/forms/form-skeleton";

type Props = { mode: "create"; invoiceId?: string } | { mode: "edit"; id: string; invoiceId: string };

export function InvoiceItemForm(props: Props) {
  const isEdit = props.mode === "edit";
  const invoiceId = props.invoiceId || "";
  const id = isEdit ? props.id : "";

  const { data: invoices } = useInvoices();
  const { data: products } = useProducts();
  const { data: item, isLoading } = useInvoiceItem(invoiceId, id);
  const { mutate: createItem, isPending: isCreating } = useCreateInvoiceItem(invoiceId);
  const { mutate: updateItem, isPending: isUpdating } = useUpdateInvoiceItem(invoiceId, id);

  const invoiceOptions = invoices?.map((inv) => ({
    label: inv.invoice_number || `Invoice ${inv.invoice_id.slice(0, 8)}`,
    value: inv.invoice_id,
  })) ?? [];

  const productOptions = products?.map((p) => ({
    label: p.product_name,
    value: p.product_id,
  })) ?? [];

  const defaultValues = useMemo(
    () =>
      isEdit && item
        ? {
          invoice_id: item.invoice_id,
          product_id: item.product_id,
          quantity: Number(item.quantity),
          price: Number(item.price),
        }
        : invoiceId ? ({ invoice_id: invoiceId } as unknown as Partial<InvoiceItemFormValues>) : undefined,
    [isEdit, item, invoiceId]
  );

  function handleSubmit(data: InvoiceItemFormValues) {
    if (isEdit) {
      updateItem(data);
    } else {
      createItem(data);
    }
  }

  if (isEdit && isLoading) return <FormSkeleton fieldCount={4} />;
  if (isEdit && !item) return <p className="text-muted-foreground">Item not found.</p>;

  return (
    <DynamicForm<InvoiceItemFormValues>
      schema={invoiceItemSchema}
      fields={INVOICE_ITEM_FORM_FIELDS}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Item" : "Add Item"}
      isLoading={isCreating || isUpdating}
      dynamicOptions={{
        invoice_id: invoiceOptions,
        product_id: productOptions,
      }}
      defaultValues={defaultValues}
    />
  );
}
