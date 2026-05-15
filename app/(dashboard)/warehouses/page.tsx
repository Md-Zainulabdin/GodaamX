"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WarehouseTable } from "./_components/warehouse-table";
import { ExportButton } from "@/components/tables/export-button";
import { REPORT_API } from "@/constants/api.constants";
import { PageHeader } from "@/components/layout/page-header";

const WarehousesPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Warehouses & Storage" 
        breadcrumbs={[{ label: "Warehouses" }]}
      >
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={"/warehouses/create"}>Add Warehouse</Link>
          </Button>
          <ExportButton endpoint={REPORT_API.warehouses} filename="warehouses.csv" />
        </div>
      </PageHeader>

      {/* Warehouses Table */}
      <div>
        <WarehouseTable />
      </div>
    </div>
  );
};

export default WarehousesPage;
