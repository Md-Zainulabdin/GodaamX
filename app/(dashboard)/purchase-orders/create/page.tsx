import { PurchaseOrderForm } from "../_components/purchase-order-form";
import { PageHeader } from "@/components/layout/page-header";

export default function CreatePurchaseOrderPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="New Purchase Order" 
        breadcrumbs={[
          { label: "Purchase Orders", href: "/purchase-orders" },
          { label: "Create" }
        ]}
      />

      <div className="max-w-2xl">
        <PurchaseOrderForm mode="create" />
      </div>
    </div>
  );
}
