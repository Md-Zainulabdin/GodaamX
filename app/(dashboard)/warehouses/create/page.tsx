import { WarehouseForm } from "../_components/warehouse-form";
import { PageHeader } from "@/components/layout/page-header";

export default function CreateWarehousePage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Register New Warehouse" 
        breadcrumbs={[
          { label: "Warehouses", href: "/warehouses" },
          { label: "Create" }
        ]}
      />

      <div className="max-w-2xl">
        <WarehouseForm mode="create" />
      </div>
    </div>
  );
}
