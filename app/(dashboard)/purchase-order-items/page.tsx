"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePurchaseOrders } from "@/app/(dashboard)/purchase-orders/_hook/use-purchase-orders";

import { POITable } from "./_components/poi-table";

const POIPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedPoId = searchParams.get("po_id") || "";

  const { data: purchaseOrders, isLoading: isLoadingOrders } = usePurchaseOrders();

  const handlePoChange = (id: string) => {
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
            <BreadcrumbLink href="/purchase-order-items">Purchase Order Items</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Section */}
      <div className="my-8 flex w-full items-center justify-between">

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">Purchase Order Items</h1>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-zinc-700 whitespace-nowrap">Select Order:</span>
            <Select
              value={selectedPoId}
              onValueChange={handlePoChange}
              disabled={isLoadingOrders}
            >
              <SelectTrigger className="w-[280px] bg-zinc-50/50">
                <SelectValue placeholder={isLoadingOrders ? "Loading orders..." : "Choose a Purchase Order"} />
              </SelectTrigger>
              <SelectContent>
                {purchaseOrders?.map((po) => (
                  <SelectItem key={po.po_id} value={po.po_id}>
                    {po.order_number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>


        <Button
          asChild
          disabled={!selectedPoId}
          className="h-11 px-6 shadow-lg shadow-black/5"
        >
          <Link href={`/purchase-order-items/create?po_id=${selectedPoId}`}>
            Add Item
          </Link>
        </Button>
      </div>

      {/* Content Section */}
      <div>
        {selectedPoId ? (
          <POITable poId={selectedPoId} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border rounded-md">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-zinc-50 text-zinc-400">
              <ShoppingCart className="size-6" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900">No Order Selected</h3>
            <p className="mt-1 max-w-[280px] text-sm text-zinc-500">
              Please select a purchase order from the dropdown above to view its items.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default POIPage;
