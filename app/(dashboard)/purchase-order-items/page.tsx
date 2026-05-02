"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PAGE_TITLES } from "@/constants/constants";
import { usePurchaseOrders } from "@/app/(dashboard)/purchase-orders/_hook/use-purchase-orders";

import { POITable } from "./_components/poi-table";

const POIPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPoId, setSelectedPoId] = useState<string>(searchParams.get("po_id") || "");

  const { data: purchaseOrders } = usePurchaseOrders();

  const handlePoChange = (id: string) => {
    setSelectedPoId(id);
    router.push(`${pathname}?po_id=${id}`);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">GodaamX</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Purchase Order Items</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title */}
      <div className="my-8 flex w-full items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{PAGE_TITLES[pathname]}</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Select Order:</span>
            <Select value={selectedPoId} onValueChange={handlePoChange}>
              <SelectTrigger className="w-50">
                <SelectValue placeholder="Select a PO" />
              </SelectTrigger>
              <SelectContent>
                {purchaseOrders?.map((po) => (
                  <SelectItem key={po.po_id} value={po.po_id}>
                    {po.order_number || `Order ${po.po_id.slice(0, 8)}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button asChild disabled={!selectedPoId}>
          <Link href={`/purchase-order-items/create${selectedPoId ? `?po_id=${selectedPoId}` : ""}`}>
            Add Item
          </Link>
        </Button>
      </div>

      {/* POI Table */}
      <div>
        <POITable poId={selectedPoId} />
      </div>
    </div>
  );
};

export default POIPage;
