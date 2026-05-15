"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InvoiceTable } from "./_components/invoice-table";
import { ExportButton } from "@/components/tables/export-button";
import { REPORT_API } from "@/constants/api.constants";
import { PageHeader } from "@/components/layout/page-header";

const InvoicesPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Invoices & Billing" 
        breadcrumbs={[{ label: "Invoices" }]}
      >
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={"/invoices/create"}>Add Invoice</Link>
          </Button>
          <ExportButton endpoint={REPORT_API.invoices} filename="invoices.csv" />
        </div>
      </PageHeader>

      {/* Invoice Table */}
      <div>
        <InvoiceTable />
      </div>
    </div>
  );
};

export default InvoicesPage;
