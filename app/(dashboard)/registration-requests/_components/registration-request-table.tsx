"use client";

import { DataTable } from "@/components/tables/data-table";
import { REGISTRATION_REQUEST_COLUMNS } from "@/constants/table.constants";
import { useRegistrationRequests, useApproveRegistrationRequest, useRejectRegistrationRequest } from "@/app/(dashboard)/registration-requests/_hook/use-registration-requests";
import { RegistrationRequest } from "@/types/global";
import { ColumnDef } from "@tanstack/react-table";
import { RegistrationRequestActions } from "./registration-request-actions";

export function RegistrationRequestTable() {
  const { data: requests, isLoading } = useRegistrationRequests();
  const { mutate: approveRequest, isPending: isApproving, variables: approvingId } = useApproveRegistrationRequest();
  const { mutate: rejectRequest, isPending: isRejecting, variables: rejectingId } = useRejectRegistrationRequest();

  const actionsColumn: ColumnDef<RegistrationRequest> = {
    accessorKey: "__actions",
    header: "Actions",
    cell: ({ row }) => (
      <RegistrationRequestActions
        requestId={row.original.request_id}
        onApprove={approveRequest}
        onReject={rejectRequest}
        isApproving={isApproving && approvingId === row.original.request_id}
        isRejecting={isRejecting && rejectingId === row.original.request_id}
      />
    ),
  };

  const columns: ColumnDef<RegistrationRequest>[] = [
    ...(REGISTRATION_REQUEST_COLUMNS as ColumnDef<RegistrationRequest>[]),
    actionsColumn,
  ];

  return <DataTable columns={columns} data={requests ?? []} isLoading={isLoading} searchKey="name" />;
}
