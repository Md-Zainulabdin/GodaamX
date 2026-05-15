"use client";

import { useParams } from "next/navigation";
import { PurchaseOrderForm } from "../../_components/purchase-order-form";
import { PageHeader } from "@/components/layout/page-header";

export default function UpdatePurchaseOrderPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Update Purchase Order" 
        breadcrumbs={[
          { label: "Purchase Orders", href: "/purchase-orders" },
          { label: "Update" }
        ]}
      />

      <div className="max-w-2xl">
        <PurchaseOrderForm mode="edit" id={id as string} />
      </div>
    </div>
  );
}
