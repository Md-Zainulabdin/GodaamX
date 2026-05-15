"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InventoryTable } from "./_components/inventory-table";
import { ExportButton } from "@/components/tables/export-button";
import { REPORT_API } from "@/constants/api.constants";
import { PageHeader } from "@/components/layout/page-header";

const InventoryPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Stock & Inventory" 
        breadcrumbs={[{ label: "Inventory" }]}
      >
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={"/inventory/create"}>Add Inventory</Link>
          </Button>
          <ExportButton endpoint={REPORT_API.inventory} filename="inventory.csv" />
        </div>
      </PageHeader>

      {/* Inventory Table */}
      <div>
        <InventoryTable />
      </div>
    </div>
  );
};

export default InventoryPage;