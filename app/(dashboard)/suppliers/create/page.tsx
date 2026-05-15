import { SupplierForm } from "../_components/supplier-form";
import { PageHeader } from "@/components/layout/page-header";

export default function CreateSupplierPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Add New Supplier" 
        breadcrumbs={[
          { label: "Suppliers", href: "/suppliers" },
          { label: "Create" }
        ]}
      />

      <div className="max-w-2xl">
        <SupplierForm mode="create" />
      </div>
    </div>
  );
}
