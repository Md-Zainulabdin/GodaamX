"use client";

import { useParams } from "next/navigation";
import { InvoiceForm } from "../../_components/invoice-form";
import { PageHeader } from "@/components/layout/page-header";

export default function UpdateInvoicePage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Update Invoice Details" 
        breadcrumbs={[
          { label: "Invoices", href: "/invoices" },
          { label: "Update" }
        ]}
      />

      <div className="max-w-2xl">
        <InvoiceForm mode="edit" id={id as string} />
      </div>
    </div>
  );
}
