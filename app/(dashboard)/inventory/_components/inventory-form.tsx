"use client";

import { useMemo } from "react";
import { DynamicForm } from "@/components/forms/dynamic-form";
import { INVENTORY_FORM_FIELDS } from "@/constants/form.constants";
import { inventorySchema, InventoryFormValues } from "@/schemas/schemas";
import {
  useCreateInventory,
  useUpdateInventory,
  useInventory,
} from "@/app/(dashboard)/inventory/_hook/use-inventory";
import { useProducts } from "@/app/(dashboard)/products/_hook/use-products";
import { useWarehouses } from "@/app/(dashboard)/warehouses/_hook/use-warehouses";
import { format } from "date-fns";

import { FormSkeleton } from "@/components/forms/form-skeleton";

type Props = { mode: "create" } | { mode: "edit"; id: string };

export function InventoryForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : "";

  const { data: products } = useProducts();
  const { data: warehouses } = useWarehouses();
  const { data: inventory, isLoading } = useInventory(id);
  const { mutate: createInventory, isPending: isCreating } = useCreateInventory();
  const { mutate: updateInventory, isPending: isUpdating } = useUpdateInventory(id);

  const productOptions =
    products?.map((p) => ({ label: p.product_name, value: p.product_id })) ?? [];
  const warehouseOptions =
    warehouses?.map((w) => ({ label: w.warehouse_name, value: w.warehouse_id })) ?? [];

  const defaultValues = useMemo(
    () => {
      const today = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
      if (isEdit && inventory) {
        return {
          product_id: inventory.product_id,
          warehouse_id: inventory.warehouse_id,
          quantity: inventory.quantity,
          reorder_level: inventory.reorder_level ?? null,
          last_restocked: inventory.last_restocked ?? today,
        };
      }
      return {
        last_restocked: today,
      };
    },
    [isEdit, inventory]
  );

  function handleSubmit(data: InventoryFormValues) {
    if (isEdit) {
      updateInventory(data);
    } else {
      createInventory(data);
    }
  }

  if (isEdit && isLoading) return <FormSkeleton fieldCount={5} />;
  if (isEdit && !inventory) return <p className="text-muted-foreground">Inventory record not found.</p>;

  return (
    <DynamicForm<InventoryFormValues>
      schema={inventorySchema}
      fields={INVENTORY_FORM_FIELDS}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Inventory" : "Create Inventory"}
      isLoading={isCreating || isUpdating}
      dynamicOptions={{
        product_id: productOptions,
        warehouse_id: warehouseOptions,
      }}
      defaultValues={defaultValues}
    />
  );
}
