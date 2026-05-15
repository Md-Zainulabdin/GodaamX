"use client";

import { useParams } from "next/navigation";
import { SupplierForm } from "../../_components/supplier-form";
import { PageHeader } from "@/components/layout/page-header";

export default function UpdateSupplierPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Update Supplier Information" 
        breadcrumbs={[
          { label: "Suppliers", href: "/suppliers" },
          { label: "Update" }
        ]}
      />

      <div className="max-w-2xl">
        <SupplierForm mode="edit" id={id as string} />
      </div>
    </div>
  );
}
