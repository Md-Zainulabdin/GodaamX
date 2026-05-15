"use client";

import { useParams } from "next/navigation";
import { WarehouseForm } from "../../_components/warehouse-form";
import { PageHeader } from "@/components/layout/page-header";

export default function UpdateWarehousePage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Update Warehouse Info" 
        breadcrumbs={[
          { label: "Warehouses", href: "/warehouses" },
          { label: "Update" }
        ]}
      />

      <div className="max-w-2xl">
        <WarehouseForm mode="edit" id={id as string} />
      </div>
    </div>
  );
}
