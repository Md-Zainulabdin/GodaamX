"use client";

import { useParams } from "next/navigation";
import { ShipmentForm } from "../../_components/shipment-form";
import { PageHeader } from "@/components/layout/page-header";

export default function UpdateShipmentPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Update Shipment Status" 
        breadcrumbs={[
          { label: "Shipments", href: "/shipments" },
          { label: "Update" }
        ]}
      />

      <div className="max-w-2xl">
        <ShipmentForm mode="edit" id={id as string} />
      </div>
    </div>
  );
}
