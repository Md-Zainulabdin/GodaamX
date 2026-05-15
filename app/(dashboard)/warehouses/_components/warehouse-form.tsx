"use client";

import { useMemo } from "react";
import { DynamicForm } from "@/components/forms/dynamic-form";
import { WAREHOUSE_FORM_FIELDS } from "@/constants/form.constants";
import { warehouseSchema, WarehouseFormValues } from "@/schemas/schemas";
import {
  useCreateWarehouse,
  useUpdateWarehouse,
  useWarehouse,
} from "@/app/(dashboard)/warehouses/_hook/use-warehouses";

import { FormSkeleton } from "@/components/forms/form-skeleton";

type Props = { mode: "create" } | { mode: "edit"; id: string };

export function WarehouseForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : "";

  const { data: warehouse, isLoading } = useWarehouse(id);
  const { mutate: createWarehouse, isPending: isCreating } = useCreateWarehouse();
  const { mutate: updateWarehouse, isPending: isUpdating } = useUpdateWarehouse(id);

  const defaultValues = useMemo(
    () =>
      isEdit && warehouse
        ? {
          warehouse_name: warehouse.warehouse_name,
          location: warehouse.location ?? "",
          city: warehouse.city ?? "",
          capacity: warehouse.capacity ?? undefined,
          phone: warehouse.phone ?? "",
          status: (warehouse.is_active ? "Active" : "Inactive") as "Active" | "Inactive",
        }
        : undefined,
    [isEdit, warehouse]
  );

  function handleSubmit(data: WarehouseFormValues) {
    const payload = {
      ...data,
      is_active: data.status === "Active",
    };
    isEdit ? updateWarehouse(payload) : createWarehouse(payload);
  }

  if (isEdit && isLoading) return <FormSkeleton fieldCount={6} />;
  if (isEdit && !warehouse) return <p className="text-muted-foreground">Warehouse not found.</p>;

  return (
    <DynamicForm<WarehouseFormValues>
      schema={warehouseSchema}
      fields={WAREHOUSE_FORM_FIELDS}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Warehouse" : "Create Warehouse"}
      isLoading={isCreating || isUpdating}
      defaultValues={defaultValues}
    />
  );
}
