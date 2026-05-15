import { InventoryForm } from "../_components/inventory-form";
import { PageHeader } from "@/components/layout/page-header";

export default function CreateInventoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Add Stock Item" 
        breadcrumbs={[
          { label: "Inventory", href: "/inventory" },
          { label: "Create" }
        ]}
      />

      <div className="max-w-2xl">
        <InventoryForm mode="create" />
      </div>
    </div>
  );
}
