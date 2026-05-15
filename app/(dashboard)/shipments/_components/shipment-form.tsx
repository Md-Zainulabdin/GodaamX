"use client";

import { useMemo } from "react";
import { DynamicForm } from "@/components/forms/dynamic-form";
import { SHIPMENT_FORM_FIELDS } from "@/constants/form.constants";
import { shipmentSchema, ShipmentFormValues } from "@/schemas/schemas";
import {
  useCreateShipment,
  useUpdateShipment,
  useShipment,
} from "@/app/(dashboard)/shipments/_hook/use-shipments";
import { usePurchaseOrders } from "@/app/(dashboard)/purchase-orders/_hook/use-purchase-orders";
import { useWarehouses } from "@/app/(dashboard)/warehouses/_hook/use-warehouses";

import { FormSkeleton } from "@/components/forms/form-skeleton";

type Props = { mode: "create" } | { mode: "edit"; id: string };

export function ShipmentForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : "";

  const { data: purchaseOrders } = usePurchaseOrders();
  const { data: warehouses } = useWarehouses();
  const { data: shipment, isLoading } = useShipment(id);
  const { mutate: createShipment, isPending: isCreating } = useCreateShipment();
  const { mutate: updateShipment, isPending: isUpdating } = useUpdateShipment(id);

  const poOptions =
    purchaseOrders?.map((po) => ({
      label: po.order_number || `Order ${po.po_id.slice(0, 8)}`,
      value: po.po_id,
    })) ?? [];


  const warehouseOptions =
    warehouses?.map((w) => ({ label: w.warehouse_name, value: w.warehouse_id })) ?? [];

  const defaultValues = useMemo(
    () =>
      isEdit && shipment
        ? {
          purchase_order_id: shipment.po_id,
          carrier_name: shipment.carrier_name ?? "",
          shipment_date: shipment.shipment_date ? new Date(shipment.shipment_date).toISOString().split("T")[0] : "",
          estimated_arrival: shipment.estimated_arrival ? new Date(shipment.estimated_arrival).toISOString().split("T")[0] : "",
          actual_arrival: shipment.actual_arrival ? new Date(shipment.actual_arrival).toISOString().split("T")[0] : "",
          warehouse_id: shipment.warehouse_id ?? null,
          status: shipment.status as ShipmentFormValues["status"],
          notes: shipment.notes ?? "",
        }
        : undefined,
    [isEdit, shipment]
  );

  function handleSubmit(data: ShipmentFormValues) {
    if (isEdit) {
      updateShipment(data);
    } else {
      createShipment(data);
    }
  }

  if (isEdit && isLoading) return <FormSkeleton fieldCount={8} />;
  if (isEdit && !shipment) return <p className="text-muted-foreground">Shipment not found.</p>;

  return (
    <DynamicForm<ShipmentFormValues>
      schema={shipmentSchema}
      fields={SHIPMENT_FORM_FIELDS}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Shipment" : "Create Shipment"}
      isLoading={isCreating || isUpdating}
      dynamicOptions={{
        purchase_order_id: poOptions,
        warehouse_id: warehouseOptions,
      }}
      defaultValues={defaultValues}
    />
  );
}
