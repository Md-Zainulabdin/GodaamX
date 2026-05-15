"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShipmentTable } from "./_components/shipment-table";
import { ExportButton } from "@/components/tables/export-button";
import { REPORT_API } from "@/constants/api.constants";
import { PageHeader } from "@/components/layout/page-header";

const ShipmentsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Shipment Tracking" 
        breadcrumbs={[{ label: "Shipments" }]}
      >
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={"/shipments/create"}>Add Shipment</Link>
          </Button>
          <ExportButton endpoint={REPORT_API.shipments} filename="shipments.csv" />
        </div>
      </PageHeader>

      {/* Shipment Table */}
      <div>
        <ShipmentTable />
      </div>
    </div>
  );
};

export default ShipmentsPage;
