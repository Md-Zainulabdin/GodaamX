import { CustomerForm } from "../_components/customer-form";
import { PageHeader } from "@/components/layout/page-header";

export default function CreateCustomerPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Add New Customer" 
        breadcrumbs={[
          { label: "Customers", href: "/customers" },
          { label: "Create" }
        ]}
      />

      <div className="max-w-2xl">
        <CustomerForm mode="create" />
      </div>
    </div>
  );
}
