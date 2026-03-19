"use client";

import { DynamicForm } from "@/components/forms/dynamic-form";
import { SUPPLIER_FORM_FIELDS } from "@/constants/form.constants";
import { supplierSchema, SupplierFormValues } from "@/schemas/schemas";
import { useCreateSupplier, useUpdateSupplier, useSupplier } from "@/app/(dashboard)/suppliers/_hook/use-suppliers";

type Props = { mode: "create" } | { mode: "edit"; id: string };

export function SupplierForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : "";

  const { data: supplier, isLoading } = useSupplier(id);
  const { mutate: createSupplier, isPending: isCreating } = useCreateSupplier();
  const { mutate: updateSupplier, isPending: isUpdating } = useUpdateSupplier(id);

  function handleSubmit(data: SupplierFormValues) {
    isEdit ? updateSupplier(data) : createSupplier(data);
  }

  if (isEdit && isLoading) return <p className="text-muted-foreground">Loading...</p>;
  if (isEdit && !supplier) return <p className="text-muted-foreground">Supplier not found.</p>;

  return (
    <DynamicForm<SupplierFormValues>
      schema={supplierSchema}
      fields={SUPPLIER_FORM_FIELDS}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Supplier" : "Create Supplier"}
      isLoading={isCreating || isUpdating}
      defaultValues={
        isEdit && supplier
          ? {
              supplier_name: supplier.supplier_name,
              contact_email: supplier.contact_email,
              contact_phone: supplier.contact_phone,
              address: supplier.address,
              status: supplier.status as "Active" | "Inactive",
            }
          : undefined
      }
    />
  );
}
