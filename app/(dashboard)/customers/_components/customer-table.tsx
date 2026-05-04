"use client";

import { DataTable } from "@/components/tables/data-table";
import { CUSTOMER_COLUMNS, actionsColumn } from "@/constants/table.constants";
import { useCustomers, useDeleteCustomer } from "@/app/(dashboard)/customers/_hook/use-customers";
import { Customer } from "@/types/global";

export function CustomerTable() {
  const { data: customers, isLoading } = useCustomers();
  const { mutate: deleteCustomer, isPending: isDeleting } = useDeleteCustomer();

  const columns = [
    ...CUSTOMER_COLUMNS,
    actionsColumn<Customer>({
      basePath: "/customers/update",
      idKey: "customer_id",
      onDelete: deleteCustomer,
      isDeleting,
    }),
  ];

  return <DataTable columns={columns} data={customers ?? []} isLoading={isLoading} />;
}
