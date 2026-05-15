"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PurchaseOrderTable } from "./_components/purchase-order-table";
import { ExportButton } from "@/components/tables/export-button";
import { REPORT_API } from "@/constants/api.constants";
import { PageHeader } from "@/components/layout/page-header";

const PurchaseOrdersPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Purchase Orders" 
        breadcrumbs={[{ label: "Purchase Orders" }]}
      >
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={"/purchase-orders/create"}>Add Order</Link>
          </Button>
          <ExportButton endpoint={REPORT_API.purchaseOrders} filename="purchase_orders.csv" />
        </div>
      </PageHeader>

      {/* Purchase Orders Table */}
      <div>
        <PurchaseOrderTable />
      </div>
    </div>
  );
};

export default PurchaseOrdersPage;
