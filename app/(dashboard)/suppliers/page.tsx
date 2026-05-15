"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SupplierTable } from "./_components/supplier-table";
import { ExportButton } from "@/components/tables/export-button";
import { REPORT_API } from "@/constants/api.constants";
import { PageHeader } from "@/components/layout/page-header";

const SuppliersPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Suppliers Management" 
        breadcrumbs={[{ label: "Suppliers" }]}
      >
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={"/suppliers/create"}>Add Supplier</Link>
          </Button>
          <ExportButton endpoint={REPORT_API.suppliers} filename="suppliers.csv" />
        </div>
      </PageHeader>

      {/* Suppliers Table */}
      <div>
        <SupplierTable />
      </div>
    </div>
  );
};

export default SuppliersPage;
