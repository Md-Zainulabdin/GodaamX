"use client";

import { useParams } from "next/navigation";
import { CustomerForm } from "../../_components/customer-form";
import { PageHeader } from "@/components/layout/page-header";

export default function UpdateCustomerPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Update Customer Profile" 
        breadcrumbs={[
          { label: "Customers", href: "/customers" },
          { label: "Update" }
        ]}
      />

      <div className="max-w-2xl">
        <CustomerForm mode="edit" id={id as string} />
      </div>
    </div>
  );
}
