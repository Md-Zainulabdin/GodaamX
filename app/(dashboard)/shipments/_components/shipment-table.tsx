"use client";

import { DataTable } from "@/components/tables/data-table";
import { SHIPMENT_COLUMNS, actionsColumn } from "@/constants/table.constants";
import { useShipments, useDeleteShipment } from "@/app/(dashboard)/shipments/_hook/use-shipments";
import { Shipment } from "@/types/global";

export function ShipmentTable() {
  const { data: shipments, isLoading } = useShipments();
  const { mutate: deleteShipment, isPending: isDeleting } = useDeleteShipment();

  const columns = [
    ...SHIPMENT_COLUMNS,
    actionsColumn<Shipment>({
      basePath: "/shipments/update",
      idKey: "shipment_id",
      onDelete: deleteShipment,
      isDeleting,
    }),
  ];

  return <DataTable columns={columns} data={shipments ?? []} isLoading={isLoading} searchKey="carrier_name" />;
}
