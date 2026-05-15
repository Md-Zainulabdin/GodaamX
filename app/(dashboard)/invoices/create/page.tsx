import { InvoiceForm } from "../_components/invoice-form";
import { PageHeader } from "@/components/layout/page-header";

export default function CreateInvoicePage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Create New Invoice" 
        breadcrumbs={[
          { label: "Invoices", href: "/invoices" },
          { label: "Create" }
        ]}
      />

      <div className="max-w-2xl">
        <InvoiceForm mode="create" />
      </div>
    </div>
  );
}
