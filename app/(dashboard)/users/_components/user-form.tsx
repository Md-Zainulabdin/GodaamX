"use client";

import { DynamicForm } from "@/components/forms/dynamic-form";
import { USER_FORM_FIELDS } from "@/constants/form.constants";
import { userSchema, UserFormValues } from "@/schemas/schemas";
import { useCreateUser, useUpdateUser, useUser } from "@/app/(dashboard)/users/_hook/use-users";

type Props = { mode: "create" } | { mode: "edit"; id: string };

export function UserForm(props: Props) {
  const isEdit = props.mode === "edit";
  const id = isEdit ? props.id : "";

  const { data: user, isLoading } = useUser(id);
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser(id);

  function handleSubmit(data: UserFormValues) {
    isEdit ? updateUser(data) : createUser(data);
  }

  if (isEdit && isLoading) return <p className="text-muted-foreground">Loading...</p>;
  if (isEdit && !user) return <p className="text-muted-foreground">User not found.</p>;

  const fields = USER_FORM_FIELDS.map((f) => (f.name === "password" ? { ...f, hidden: isEdit } : f));

  return (
    <DynamicForm<UserFormValues>
      schema={userSchema}
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update User" : "Create User"}
      isLoading={isCreating || isUpdating}
      defaultValues={
        isEdit && user
          ? {
              name: user.name,
              email: user.email,
              phone_number: user.phone_number ?? "",
              role: user.role,
            }
          : undefined
      }
    />
  );
}
