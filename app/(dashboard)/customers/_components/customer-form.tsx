"use client";

import { useMemo } from "react";
import { DynamicForm } from "@/components/forms/dynamic-form";
import { CUSTOMER_FORM_FIELDS } from "@/constants/form.constants";
import { customerSchema, CustomerFormValues } from "@/schemas/schemas";
import {
  useCreateCustomer,
  useUpdateCustomer,
  useCustomer,
} from "@/app/(dashboard)/customers/_hook/use-customers";

import { FormSkeleton } from "@/components/forms/form-skeleton";

type Props = { mode: "create" } | { mode: "edit"; id: string };

export function CustomerForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : "";

  const { data: customer, isLoading } = useCustomer(id);
  const { mutate: createCustomer, isPending: isCreating } = useCreateCustomer();
  const { mutate: updateCustomer, isPending: isUpdating } = useUpdateCustomer(id);

  const defaultValues = useMemo(
    () =>
      isEdit && customer
        ? {
          customer_name: customer.customer_name,
          contact_person: customer.contact_person ?? "",
          email: customer.email ?? "",
          phone: customer.phone ?? "",
          address: customer.address ?? "",
          customer_type: customer.customer_type as CustomerFormValues["customer_type"],
        }
        : undefined,
    [isEdit, customer]
  );

  function handleSubmit(data: CustomerFormValues) {
    if (isEdit) {
      updateCustomer(data);
    } else {
      createCustomer(data);
    }
  }

  if (isEdit && isLoading) return <FormSkeleton fieldCount={6} />;
  if (isEdit && !customer) return <p className="text-muted-foreground">Customer not found.</p>;

  return (
    <DynamicForm<CustomerFormValues>
      schema={customerSchema}
      fields={CUSTOMER_FORM_FIELDS}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Customer" : "Create Customer"}
      isLoading={isCreating || isUpdating}
      defaultValues={defaultValues}
    />
  );
}
