"use client";

import { useMemo } from "react";
import { DynamicForm } from "@/components/forms/dynamic-form";
import { USER_FORM_FIELDS } from "@/constants/form.constants";
import { userSchema, UserFormValues } from "@/schemas/schemas";
import { useCreateUser, useUpdateUser, useUser } from "@/app/(dashboard)/users/_hook/use-users";
import { useSuppliers } from "@/app/(dashboard)/suppliers/_hook/use-suppliers";

type Props = { mode: "create" } | { mode: "edit"; id: string };

export function UserForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : "";

  const { data: user, isLoading } = useUser(id);
  const { data: suppliers } = useSuppliers();
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser(id);

  const supplierOptions =
    suppliers?.map((s) => ({ label: s.supplier_name, value: s.supplier_id })) ?? [];

  const defaultValues = useMemo(
    () =>
      isEdit && user
        ? {
            name: user.name,
            email: user.email,
            phone_number: user.phone_number ?? "",
            role: user.role,
            supplier_id: user.supplier_id ?? null,
          }
        : undefined,
    [isEdit, user?.user_id, user?.name, user?.email, user?.phone_number, user?.role, user?.supplier_id]
  );

  const fields = USER_FORM_FIELDS.map((f) => (f.name === "password" ? { ...f, hidden: isEdit } : f));

  function handleSubmit(data: UserFormValues) {
    isEdit ? updateUser(data) : createUser(data);
  }

  if (isEdit && isLoading) return <p className="text-muted-foreground">Loading...</p>;
  if (isEdit && !user) return <p className="text-muted-foreground">User not found.</p>;

  return (
    <DynamicForm<UserFormValues>
      schema={userSchema}
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update User" : "Create User"}
      isLoading={isCreating || isUpdating}
      dynamicOptions={{ supplier_id: supplierOptions }}
      defaultValues={defaultValues}
    />
  );
}
