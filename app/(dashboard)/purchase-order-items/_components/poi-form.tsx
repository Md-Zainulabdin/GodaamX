"use client";

import { useMemo } from "react";
import { DynamicForm } from "@/components/forms/dynamic-form";
import { POI_FORM_FIELDS } from "@/constants/form.constants";
import { purchaseOrderItemSchema, PurchaseOrderItemFormValues } from "@/schemas/schemas";
import {
  useCreatePOI,
  useUpdatePOI,
  usePOIDetail,
} from "@/app/(dashboard)/purchase-order-items/_hook/use-poi";
import { usePurchaseOrders } from "@/app/(dashboard)/purchase-orders/_hook/use-purchase-orders";
import { useProducts } from "@/app/(dashboard)/products/_hook/use-products";

type Props = { mode: "create"; poId?: string } | { mode: "edit"; id: string; poId: string };

export function POIForm(props: Props) {
  const isEdit = props.mode === "edit";
  const poId = props.poId || "";
  const id = isEdit ? props.id : "";

  const { data: purchaseOrders } = usePurchaseOrders();
  const { data: products } = useProducts();
  const { data: item, isLoading } = usePOIDetail(poId, id);
  const { mutate: createPOI, isPending: isCreating } = useCreatePOI(poId);
  const { mutate: updatePOI, isPending: isUpdating } = useUpdatePOI(poId, id);

  const poOptions = purchaseOrders?.map((po) => ({
    label: po.order_number || `Order ${po.po_id.slice(0, 8)}`,
    value: po.po_id,
  })) ?? [];

  const productOptions = products?.map((p) => ({
    label: p.product_name,
    value: p.product_id,
  })) ?? [];

  const defaultValues = useMemo(
    () =>
      isEdit && item
        ? {
          po_id: item.po_id,
          product_id: item.product_id,
          quantity: Number(item.quantity),
          price: Number(item.price),
        }
        : poId ? { po_id: poId } as any : undefined,
    [isEdit, item, poId]
  );

  function handleSubmit(data: PurchaseOrderItemFormValues) {
    isEdit ? updatePOI(data) : createPOI(data);
  }

  if (isEdit && isLoading) return <p className="text-muted-foreground">Loading...</p>;
  if (isEdit && !item) return <p className="text-muted-foreground">Item not found.</p>;

  return (
    <DynamicForm<PurchaseOrderItemFormValues>
      schema={purchaseOrderItemSchema}
      fields={POI_FORM_FIELDS}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Item" : "Add Item"}
      isLoading={isCreating || isUpdating}
      dynamicOptions={{
        po_id: poOptions,
        product_id: productOptions,
      }}
      defaultValues={defaultValues}
    />
  );
}
