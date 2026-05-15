import { ShipmentForm } from "../_components/shipment-form";
import { PageHeader } from "@/components/layout/page-header";

export default function CreateShipmentPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Schedule New Shipment" 
        breadcrumbs={[
          { label: "Shipments", href: "/shipments" },
          { label: "Create" }
        ]}
      />

      <div className="max-w-2xl">
        <ShipmentForm mode="create" />
      </div>
    </div>
  );
}
