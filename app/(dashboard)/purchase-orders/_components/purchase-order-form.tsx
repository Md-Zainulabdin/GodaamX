"use client";

import { useMemo } from "react";
import { DynamicForm } from "@/components/forms/dynamic-form";
import { PURCHASE_ORDER_FORM_FIELDS } from "@/constants/form.constants";
import { purchaseOrderSchema, PurchaseOrderFormValues } from "@/schemas/schemas";
import {
  useCreatePurchaseOrder,
  useUpdatePurchaseOrder,
  usePurchaseOrder,
} from "@/app/(dashboard)/purchase-orders/_hook/use-purchase-orders";
import { useSuppliers } from "@/app/(dashboard)/suppliers/_hook/use-suppliers";
import { useWarehouses } from "@/app/(dashboard)/warehouses/_hook/use-warehouses";

type Props = { mode: "create" } | { mode: "edit"; id: string };

export function PurchaseOrderForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : "";

  const { data: suppliers } = useSuppliers();
  const { data: warehouses } = useWarehouses();
  const { data: purchaseOrder, isLoading } = usePurchaseOrder(id);
  const { mutate: createPurchaseOrder, isPending: isCreating } = useCreatePurchaseOrder();
  const { mutate: updatePurchaseOrder, isPending: isUpdating } = useUpdatePurchaseOrder(id);

  const supplierOptions =
    suppliers?.map((s) => ({ label: s.supplier_name, value: s.supplier_id })) ?? [];
  const warehouseOptions =
    warehouses?.map((w) => ({ label: w.warehouse_name, value: w.warehouse_id })) ?? [];

  const defaultValues = useMemo(
    () =>
      isEdit && purchaseOrder
        ? {
            supplier_id: purchaseOrder.supplier_id,
            warehouse_id: purchaseOrder.warehouse_id ?? null,
            order_number: purchaseOrder.order_number ?? "",
            order_date: purchaseOrder.order_date ? new Date(purchaseOrder.order_date).toISOString().split("T")[0] : "",
            expected_delivery: purchaseOrder.expected_delivery ? new Date(purchaseOrder.expected_delivery).toISOString().split("T")[0] : "",
            total_amount: purchaseOrder.total_amount ?? null,
            status: purchaseOrder.status as any,
          }
        : undefined,
    [isEdit, purchaseOrder?.po_id, purchaseOrder?.supplier_id, purchaseOrder?.warehouse_id, purchaseOrder?.order_number, purchaseOrder?.order_date, purchaseOrder?.expected_delivery, purchaseOrder?.total_amount, purchaseOrder?.status]
  );

  function handleSubmit(data: PurchaseOrderFormValues) {
    isEdit ? updatePurchaseOrder(data) : createPurchaseOrder(data);
  }

  if (isEdit && isLoading) return <p className="text-muted-foreground">Loading...</p>;
  if (isEdit && !purchaseOrder) return <p className="text-muted-foreground">Purchase order not found.</p>;

  return (
    <DynamicForm<PurchaseOrderFormValues>
      schema={purchaseOrderSchema}
      fields={PURCHASE_ORDER_FORM_FIELDS}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Order" : "Create Order"}
      isLoading={isCreating || isUpdating}
      dynamicOptions={{
        supplier_id: supplierOptions,
        warehouse_id: warehouseOptions,
      }}
      defaultValues={defaultValues}
    />
  );
}
