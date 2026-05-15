"use client";

import { useParams } from "next/navigation";
import { InventoryForm } from "../../_components/inventory-form";
import { PageHeader } from "@/components/layout/page-header";

export default function UpdateInventoryPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Update Stock Levels" 
        breadcrumbs={[
          { label: "Inventory", href: "/inventory" },
          { label: "Update" }
        ]}
      />

      <div className="max-w-2xl">
        <InventoryForm mode="edit" id={id as string} />
      </div>
    </div>
  );
}
