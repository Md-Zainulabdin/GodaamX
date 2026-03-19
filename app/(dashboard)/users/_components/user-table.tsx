"use client";

import { DataTable } from "@/components/tables/data-table";
import { USER_COLUMNS, actionsColumn } from "@/constants/table.constants";
import { useUsers, useDeleteUser } from "@/app/(dashboard)/users/_hook/use-users";
import { User } from "@/types/global";

export function UserTable() {
  const { data: users } = useUsers();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const columns = [
    ...USER_COLUMNS,
    actionsColumn<User>({
      basePath: "/users/update",
      idKey: "user_id",
      onDelete: deleteUser,
      isDeleting,
    }),
  ];

  return <DataTable columns={columns} data={users ?? []} />;
}
