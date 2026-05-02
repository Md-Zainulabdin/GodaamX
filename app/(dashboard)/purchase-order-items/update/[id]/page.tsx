"use client";

import { useParams, useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { POIForm } from "../../_components/poi-form";

export default function UpdatePOIPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const poId = searchParams.get("po_id");

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">GodaamX</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/purchase-order-items">Purchase Order Items</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Update</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="my-8 w-full">
        <h1 className="text-2xl font-semibold tracking-tight">Update Purchase Order Item</h1>
      </div>

      <div>
        <POIForm mode="edit" id={id as string} poId={poId as string} />
      </div>
    </div>
  );
}
