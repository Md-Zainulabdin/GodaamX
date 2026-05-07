"use client";

import { useMemo } from "react";
import { DataTable } from "@/components/tables/data-table";
import { USER_COLUMNS, actionsColumn } from "@/constants/table.constants";
import { useUsers, useDeleteUser } from "@/app/(dashboard)/users/_hook/use-users";
import { User } from "@/types/global";

export function UserTable() {
  const { data: users, isLoading } = useUsers();
  const { mutate: deleteUser, isPending: isDeleting, variables: deletingId } = useDeleteUser();

  const columns = useMemo(
    () => [
      ...USER_COLUMNS,
      actionsColumn<User>({
        basePath: "/users/update",
        idKey: "user_id",
        onDelete: deleteUser,
        isDeleting,
        deletingId,
      }),
    ],
    [deleteUser, isDeleting, deletingId]
  );

  return <DataTable columns={columns} data={users ?? []} isLoading={isLoading} searchKey="name" />;
}
