"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CustomerTable } from "./_components/customer-table";
import { ExportButton } from "@/components/tables/export-button";
import { REPORT_API } from "@/constants/api.constants";
import { PageHeader } from "@/components/layout/page-header";

const CustomersPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Customer Directory" 
        breadcrumbs={[{ label: "Customers" }]}
      >
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={"/customers/create"}>Add Customer</Link>
          </Button>
          <ExportButton endpoint={REPORT_API.customers} filename="customers.csv" />
        </div>
      </PageHeader>

      {/* Customer Table */}
      <div>
        <CustomerTable />
      </div>
    </div>
  );
};

export default CustomersPage;
